/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  add,
  addlogo,
  arrowleft,
  coverimage,
  done,
  visa,
  master,
  image,
  logout,
  notification,
  store1,
} from "../../assets";
// import { getCardImage } from "@/utils/formatNumber";
// import SaveCard from "../PopupModals/SaveCard";
// import Upgrade from "../PopupModals/Upgrade";
// import Navbar from "../Navbar/Navbar";
import { useFetchUser } from "@/datahooks/users/userhooks";
import { useSidebarStore } from "@/ZustandStores/sidebarStore";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { useStore } from "@/ZustandStores/generalStore";
import {
  useSubscriptionStatus,
  useUpgradeSubscription,
} from "@/datahooks/billinghooks/subscription-manager/hook";
import { Loader2 } from "lucide-react";
import { PaystackButton } from "react-paystack";
import clsx from "clsx";
import { usePaystackPayment } from "react-paystack";
import DashboardIntro from "../Dashboard/DashboardIntro";
import { motion } from "framer-motion";
const PlanSetting = () => {
  const { store } = useStore();
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  //   watch,
  // } = useForm();
  const { user } = useFetchUser();
  const { isCollapsed } = useSidebarStore();
  const {
    data: subscriptionStatus,
    isLoading: subscriptionStatusLoading,
    isError: subscriptionStatusError,
  } = useSubscriptionStatus();
  console.log(subscriptionStatus);
  const SUBSCRIPTION_END_DATE = new Date(
    subscriptionStatus?.endDate
  ).toLocaleDateString();
  const [chosenPlan, setChosenPlan] = useState(null);
  const [duration, setDuration ] = useState(null)
  const [amount, setAmount ] = useState(0)
  const componentProps = {
    email: user?.email,
    amount: amount * 100,
    publicKey: import.meta.env.VITE_PAYSTACK_TEST_PUBLIC_KEY,

    onSuccess: () => handleUpgrade(),
    onClose: () => {
      toast.error(
        "Payment cancelled, You need to upgrade your plan to access all features"
      );
      setShowUpgradeModal(false);
    },
  };
  const { upgradeSubscription, isUpgradeSubscriptionLoading } =
    useUpgradeSubscription();
  const determineEndDate = () => {
    if (chosenPlan?.duration === "3 month") {
      return new Date(new Date().setMonth(new Date().getMonth() + 3));
    } else if (chosenPlan?.duration === "1 year") {
      return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    }
  };
  const date = new Date();
  const fullDate = date.toLocaleDateString("en-GB");
  const handleUpgrade = () => {
    const dataForBackend = {
      id: subscriptionStatus?.id,
      startDate: new Date(),
      endDate: determineEndDate(),
      subscriptionType: "PREMIUM",
      status: "ACTIVE",
      planId: "f5aa1bc8-4296-4243-b69c-764c1cb4e653",
      storeId: store?.id,
    };
    upgradeSubscription(dataForBackend, {
      onSuccess: () => {
        setShowUpgradeModal(false);
        queryClient.invalidateQueries({
          queryKey: ["subscription-status", store?.id],
        });
      },
    });
  };
  const renderPlanDetails = () => {
    if (!subscriptionStatus)
      return (
        <div className="bg-[#8ED06C80] border-green border  p-4 rounded-lg flex justify-between items-center">
          <p className="text-green font-bold text-2xl">
            You’re on a free trial<br/> 
            <span className="text-sm font-normal"> It will expire in </span>
            <span className="font-bold py-1 text-green text-sm">
              {/* {SUBSCRIPTION_END_DATE} */}5 days
            </span>
          </p>

          <button
            onClick={() => setShowUpgradeModal(true)}
            className="bg-green cursor-pointer mt-4 text-[#ffffff] font-bold p-2 rounded-md"
          >
            Upgrade Now
          </button>
        </div>
      );
    else if (subscriptionStatus?.subscriptionType === "PREMIUM") {
      return (
        <div className="rounded-md shadow-lg border bg-white p-4">
          <div className="bg-[#EAF4E2] p-4 rounded-lg">
            <p className="text-green font-bold text-lg">
              You’re on an Upgraded Plan
            </p>
            <span className="p-1 text-green block py-1">
              Valid Till {SUBSCRIPTION_END_DATE}
            </span>
          </div>
          <ul className="subscription-information grid grid-cols-2 lg:grid-cols-4 gap-1 mt-6">
            <li className="text-[#6e6e6e] font-semibold">
              Subscription Date
              <span className="block  text-lightBlack font-normal text-sm py-1">
                {fullDate}
              </span>
            </li>
            <li className="text-[#6e6e6e] font-semibold">
              Expiry Date{" "}
              <span className="block text-lightBlack font-normal text-sm py-1">
                {SUBSCRIPTION_END_DATE}
              </span>
            </li>
            <li className="text-[#6e6e6e] font-semibold">
              Duration{" "}
              <span className="block text-lightBlack font-normal text-sm py-1">
                {'3 months'||duration}
              </span>
            </li>
            <li className="text-[#6e6e6e] font-semibold">
              Next Billing Period
              <span className="block text-lightBlack font-normal text-sm py-1">
                {SUBSCRIPTION_END_DATE}
              </span>
            </li>
          </ul>
        </div>
      );
    }
  };
  const [showUpgradeModal, setShowUpgradeModal] = useState(true);
   
  const handleChooseDuration = (e) => {
    const selectedDuration = e.target.value;
    setDuration(selectedDuration);
    // Update amount based on selected duration
    if (selectedDuration === "3 months") {
      setAmount(15000);
    }else if (selectedDuration === "6 months"){
      setAmount(25000);
    } else if (selectedDuration === "1 year") {
      setAmount(50000);
    }
  };
  const UpgradeModal = () => {
    return (
      <div
        className={clsx(
          "fixed inset-0 h-screen  w-full left-0 right-0 top-0 bottom-0 bg-black/30 backdrop-blur-sm transition-all duration-300 bg-opacity-50 flex justify-center items-center",
          showUpgradeModal
            ? "bottom-[100%] z-[10000] opacity-100"
            : "bottom-0 opacity-0 z-[-100]"
        )}
      >
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: open ? 0 : "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 right-0 bottom-0 w-full lg:w-[35%] sm:w-[90%] bg-white z-50 shadow-lg p-6 overflow-y-auto rounded-tl-xl"
        >
          {/* Close Button */}
          <button
            onClick={()=>setShowUpgradeModal(false)}
            className="absolute left-4 top-4 border border-green-500 bg-white rounded-md size-8 flex items-center justify-center opacity-70 transition-opacity hover:opacity-100"
          >
            <X className="h-5 w-5" />
          </button>

          {!chosenPlan && (
            <form className="mt-16">
              <div className="my-4">
                <select
                  value={duration}
                  onChange={handleChooseDuration }
                  className="w-full block rounded-lg p-3 border border-zinc-400"
                >
                  <option value="">Choose duration</option>
                  <option value="3 months">3 months</option>
                  <option value="6 months">6 months</option>
                  <option value="1 year">1 year</option>
                </select>
              </div>
              <div>
                <input
                  type="text"
                  value={amount || ""}
                  readOnly
                  className="border border-zinc-400 block w-full rounded-lg p-3"
                  placeholder="Amount"
                />
              </div>
             
            </form>
          )}

          {/* {chosenPlan && (
            <div className=" px-2 my-4 flex flex-col">
              <span> Selected Plan: {duration}</span>
              Amount: {amount}
              <button
                onClick={() => setChosenPlan(null)}
                className="bg-blue-500 w-1/3 mt-4  text-[#ffffff] font-bold p-2 rounded-md"
              >
                Back
              </button>
            </div>
          )} */}

          <div className=" relative  ">
          <PaystackButton
            text={`Pay  ₦${amount}`}
            className="w-full md:max-w-[400px] block text-[#ffffff] font-bold p-2 rounded-md bg-[#004324] absolute -bottom-[200px] lg:-bottom-[310px] "
            {...componentProps}
          />
          <p className="text-zinc-400 font-semibold absolute -bottom-[220px] lg:-bottom-[340px] left-1/2 transform -translate-x-1/2   w-[250px]">Payment Secured by <span className='text-black'>Paystack</span> </p>
          </div>
          {/* </div> */}
        </motion.div>
      </div>
    );
  };
  return (
    <>
      <section className="m-[73px]">
        <div
          className={
            isCollapsed
              ? "flex-grow lg:ml-20 overflow-x-hidden   "
              : "flex-grow lg:ml-56 overflow-x-hidden "
          }
        >
          <article className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between lg:items-center">

          <DashboardIntro introText={"Plans & Billings"} />
         { subscriptionStatus&&<button type="button" className="text-white bg-green w-[130px] p-2 rounded-lg hover:bg-[#004315]" onClick={()=>setShowUpgradeModal(true)}>Renew Plan</button>}
          </article>
          {/* Input Field  for saving a card*/}
          <div
            className={`${
              isCollapsed ? "lg:max-w-[1100px]" : "lg:max-w-[1000px]"
            } mx-auto mt-5`}
          >
            {renderPlanDetails()}
          </div>
        </div>

        {/* subscription */}
        <UpgradeModal
          showUpgradeModal={showUpgradeModal}
          setShowUpgradeModal={setShowUpgradeModal}
        />
        {/* <div className="flex justify-center mt-10">
                <Upgrade />
              </div> */}
      </section>
    </>
  );
};

export default PlanSetting;
