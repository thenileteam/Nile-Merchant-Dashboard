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
import { getCardImage } from "@/utils/formatNumber";
import SaveCard from "../PopupModals/SaveCard";
import Upgrade from "../PopupModals/Upgrade";
import Navbar from "../Navbar/Navbar";
import { useFetchUser } from "@/datahooks/users/userhooks";
import { useSidebarStore } from "@/ZustandStores/sidebarStore";
import { useForm } from "react-hook-form";
import { useCreateCard } from "@/datahooks/billinghooks/useBillinghook";
import { getCardType } from "@/utils/formatNumber";
import { useStore } from "@/ZustandStores/generalStore";
import DeleteCard from "../PopupModals/DeleteCard";
import { useFetchCards } from "@/datahooks/billinghooks/useBillinghook";
import {
  useSubscriptionStatus,
  useUpgradeSubscription,
} from "@/datahooks/billinghooks/subscription-manager/hook";
import { Loader2 } from "lucide-react";
import { PaystackButton } from "react-paystack";
import clsx from "clsx";
import { usePaystackPayment } from "react-paystack";
const PlanSetting = () => {
  const { store } = useStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const { user } = useFetchUser();
  const { isCollapsed } = useSidebarStore();
  const [showBilling, setShowBilling] = useState(false);
  const [addPayment, setAddPayment] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const { addCardToBackend, cardPending } = useCreateCard(() => {
    setShowCard(true);
    setShowBilling(false);
  });
  const { allCards, isFetchingCards } = useFetchCards();
  const handleShowFormAndHidePaymentButton = () => {
    setShowBilling(true);
    setAddPayment(false);
  };
  const {
    data: subscriptionStatus,
    isLoading: subscriptionStatusLoading,
    isError: subscriptionStatusError,
  } = useSubscriptionStatus();

  console.log(subscriptionStatus);


  const [chosenPlan, setChosenPlan] = useState(null);
  const componentProps = {
    email: user?.email,
    amount: chosenPlan?.amount * 100,
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
    if (chosenPlan?.duration === "1 month") {
      return new Date(new Date().setMonth(new Date().getMonth() + 1));
    } else if (chosenPlan?.duration === "1 year") {
      return new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    }
  };
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
    if (subscriptionStatus?.subscriptionType === "FREE")
      return (
        <div className="bg-[#EAF4E2] border-[#8ED06C] border-2  p-4 rounded-lg">
          <h1 className="text-[#004324] text-[20px] font-bold">Plan Details</h1>
          <p className="text-[#8ED06C] font-bold text-sm">
            You’re on a free plan and your free trial will end on{" "}
            <span className="font-black p-1 text-black">
              {new Date(subscriptionStatus.endDate).toLocaleDateString()}
            </span>
          </p>

          <button
            onClick={() => setShowUpgradeModal(true)}
            className="bg-[#004324] cursor-pointer mt-4 text-[#ffffff] font-bold p-2 rounded-md"
          >
            Upgrade to Premium
          </button>
        </div>
      );
    else if (subscriptionStatus?.subscriptionType === "PREMIUM") {
      return (
        <div className="bg-[#EAF4E2] p-4 rounded-lg">
          <h1 className="text-green text-[20px] font-bold">Plan Details</h1>
          <p className="text-green font-bold text-sm">
            You’re on a premium plan and your premium plan will end on{" "}
            <span className="font-black p-1 text-black">
              {new Date(subscriptionStatus.endDate).toLocaleDateString()}
            </span>
          </p>
        </div>
      );
    }
  };
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const UpgradeModal = () => {
    return (
      <div
        className={clsx(
          "fixed inset-0 h-screen w-screen left-0 right-0 top-0 bottom-0 bg-black transition-all duration-300 bg-opacity-50 flex justify-center items-center",
          showUpgradeModal
            ? "bottom-[100%] z-[10000] opacity-100"
            : "bottom-0 opacity-0 z-[-100]"
        )}
      >
        <div className="flex bg-white w-[500px] rounded-lg p-4  flex-col ">
          {!chosenPlan && (
            <div className="flex w-full p-4  gap-4">
              <div className="bg-white border-2 border-[#8ED06C] shadow-lg p-4 rounded w-full">
                <h1>1 month</h1>
                <p>#5000</p>

                <button
                  onClick={() =>
                    setChosenPlan({
                      amount: 5000,
                      duration: "1 month",
                    })
                  }
                  className="bg-[#004324] mt-4  text-[#ffffff] font-bold p-2 rounded-md"
                >
                  Choose Plan
                </button>
              </div>
              <div className="bg-white border-2 border-[#8ED06C] shadow-lg w-full p-4 rounded">
                <h1>1 year</h1>
                <p>#50000</p>

                <button
                  onClick={() =>
                    setChosenPlan({
                      amount: 50000,
                      duration: "1 year",
                    })
                  }
                  className="bg-[#004324] mt-4 text-[#ffffff] font-bold p-2 rounded-md"
                >
                  Choose Plan
                </button>
              </div>
            </div>
          )}
          {chosenPlan && (
            <div className=" px-2 my-4 flex flex-col">
              Selected Plan: {chosenPlan.duration}
              Amount: {chosenPlan.amount}
              <button
                onClick={() => setChosenPlan(null)}
                className="bg-blue-500 w-1/3 mt-4  text-[#ffffff] font-bold p-2 rounded-md"
              >
                Change Plan
              </button>
            </div>
          )}
          {chosenPlan && (
            <div
              className="flex gap-4
              justify-between px-2 items-center"
            >
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="bg-red-500 w-1/3  text-[#ffffff] font-bold p-2 rounded-md"
              >
                Close
              </button>

              <PaystackButton
                text="Pay Now"
                className="w-full text-[#ffffff] font-bold p-2 rounded-md bg-[#004324]"
                {...componentProps}
              />
            </div>
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <UpgradeModal
        showUpgradeModal={showUpgradeModal}
        setShowUpgradeModal={setShowUpgradeModal}
      />
      <section>
        <div
          className={
            isCollapsed
              ? "flex-grow lg:ml-20 overflow-x-hidden"
              : "flex-grow lg:ml-56 overflow-x-hidden"
          }
        ></div>

        {/* Input Field  for saving a card*/}
        <div
          className={` mt-24 flex justify-center gap-10 border border-red-500`}>
          <div className="space-y-7">
            {renderPlanDetails()}
          </div>
          {/* subscription */}
           
         {/* <div className="flex justify-center mt-10">
                <Upgrade />
              </div> */}
        </div>
      </section>
    </>
  );
};

export default PlanSetting;
