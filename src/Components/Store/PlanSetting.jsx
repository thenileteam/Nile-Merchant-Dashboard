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

  const maskCardNumber = (number) => number.replace(/\d(?=\d{4})/g, "X");
  // //space out the card numbers
  // function spaceEveryFourNum(str) {
  // return str.replace(/(.{4})/g, '$1 ').trim();
  // }
  let maskedNumber;
  const cardNumber = watch("cardNumber");
  const submitCard = (data) => {
    maskedNumber = maskCardNumber(data.cardNumber);
    const cardType = getCardType(data.cardNumber);
    const transformedData = {
      storeId: store?.id,
      cardName: data.cardName,
      cardExpiry: data.expiryDate,
      cardCvv: data.cardCvv,
      address: data.address,
      zip: data.postal,
      cardType,
      cardNumber: maskedNumber, //masked card number to backend
    };
    addCardToBackend(transformedData);
  };

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
        <div className="bg-[#EAF4E2] border-[#8ED06C] border-2  p-4 rounded-lg">
          <h1 className="text-[#004324] text-[20px] font-bold">Plan Details</h1>
          <p className="text-[#8ED06C] font-bold text-sm">
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
        >
          {/* Navbar */}
          <Navbar
            title="Plan & Billings"
            profilePic={user && user.image ? user.image : ""}
          />
        </div>

        {/* Input Field  for saving a card*/}
        <div
          className={` mt-24 ${
            isCollapsed ? "ml-20" : "ml-64"
          }  flex justify-center gap-10`}
        >
          <div className="space-y-7">
            {renderPlanDetails()}

            <div className="space-y-5 ">
              {/* <h1 className="text-[#004324] text-[24px] font-bold">
              Billing History
            </h1> */}
              {/* <div className="bg-[#EAF4E2] border-[#8ED06C] border-2 w-[338px] p-4 rounded-lg space-y-3">
              <div>
                <h1 className="text-[#004324] text-[20px] font-bold">
                  You’re being billed
                </h1>
                <p className="text-[#6E6E6E] font-bold text-sm">
                  Subscription of a premium plan has being deducted for the
                  month of August{" "}
                </p>
              </div>
              <div>
                <h1 className="text-[#004324] text-[20px] font-bold">
                  You’re being billed
                </h1>
                <p className="text-[#6E6E6E] font-bold text-sm">
                  Subscription of a premium plan has being deducted for the
                  month of july
                </p>
              </div>
              <div>
                <h1 className="text-[#004324] text-[20px] font-bold">
                  You’re being billed
                </h1>
                <p className="text-[#6E6E6E] font-bold text-sm">
                  Subscription of a premium plan has being deducted for the
                  month of June
                </p>
              </div>
            </div> */}
            </div>

            <div className={`space-y-2 `}>
              <div
                className={`bg-[#EAF4E2] border-[#8ED06C] border-2  p-4 rounded-lg ${
                  addPayment ? "block" : "hidden"
                }`}
              >
                <h1 className="text-[#004324] text-[20px] font-bold">
                  Billing Cycle
                </h1>
                <p className="text-[#6E6E6E] font-bold text-sm">
                  You’re not being billed for anything right now.
                </p>
                <button
                  className="border-[#004324] border-2 flex items-center justify-center gap-2 p-2 mt-2 rounded-lg w-full transitions"
                  onClick={handleShowFormAndHidePaymentButton}
                >
                  <img src={add} alt="" />
                  <span className="text-[#004324] font-bold">
                    Add Payment Method Below
                  </span>
                </button>
              </div>
              <form
                className={`${
                  showBilling ? "visible" : "invisible"
                } space-y-5 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[375px] p-4 rounded-lg transitions`}
              >
                <div>
                  <label
                    htmlFor="cardName"
                    className="block text-[16px] font-bold text-[#333333]"
                  >
                    Card Holder Name
                  </label>

                  <input
                    type="text"
                    {...register("cardName", {
                      required: "card name is required",
                    })}
                    placeholder="Enter Name On Card"
                    className="mt-1 w-full p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="cardNumber"
                    className="text-[16px] font-bold text-[#333333]"
                  >
                    Card Number
                  </label>

                  <input
                    type="text"
                    maxLength={19}
                    {...register("cardNumber", {
                      required: "card name is required",
                      maxLength: {
                        value: 19,
                        message: "Card number must not exceed 19 digits", // Error message
                      },
                    })}
                    placeholder="xxxx xxxx xxxx xxxx"
                    className="mt-1 w-full p-3 pl-14 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  />
                  <img
                    src={getCardImage(cardNumber)}
                    alt="card type"
                    className="absolute left-1 bottom-3"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="">
                    <label
                      htmlFor="expiryDate"
                      className="text-[16px] font-bold text-[#333333] block w-full"
                    >
                      Expiry Date
                    </label>

                    <input
                      type="text"
                      {...register("expiryDate", {
                        required: "expiry date is required",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                          message: "Invalid expiry date format (MM/YY)",
                        },
                      })}
                      placeholder="MM/YY"
                      className="mt-1 w-full p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cardCvv"
                      className="text-[16px] font-bold text-[#333333] block full"
                    >
                      CVV
                    </label>

                    <input
                      type="text"
                      maxLength={3}
                      {...register("cardCvv", { required: "cvv is required" })}
                      placeholder="XXX"
                      className="mt-1 w-full p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="text-[16px] font-bold text-[#333333] flex items-center "
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    {...register("address", {
                      required: "address is required",
                    })}
                    placeholder="xxxxxxxxxx"
                    className="mt-1 w-full p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="postal"
                    className="block text-[16px] font-bold text-[#333333]"
                  >
                    Zip/Postal Code
                  </label>

                  <input
                    type="text"
                    maxLength={6}
                    {...register("postal")}
                    placeholder="xxxxx"
                    className="mt-1 w-full p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>
                <button
                  type="button"
                  className="bg-[#004324] font-bold text-[#ffffff] p-3 rounded-md block mx-auto"
                  disabled={cardPending}
                  onClick={handleSubmit(submitCard)}
                >
                  {cardPending ? "Saving..." : "Save Card"}
                </button>
              </form>
              {/* saved card */}
              {showCard && (
                <article className="border-2 border-lightGreen bg-[#EAF4E2] w-[375px] rounded-md p-2 absolute top-[200px]">
                  <h3 className="text-green font-bold text-xl">
                    Billing Cycle
                  </h3>
                  <span className="text-lightBlack font-bold my-1 block">
                    Your Next Billing is on the Date, Month Year
                  </span>

                  <div>
                    {allCards?.map((card) => {
                      return (
                        <div
                          className="flex items-center justify-between"
                          key={card.id}
                        >
                          <div className="flex gap-2">
                            <img src={getCardImage(cardNumber)} alt="" />
                            <strong className="text-green">
                              {card.cardNumber || "XXXXXXXXXXXXX"}
                            </strong>
                          </div>
                          <DeleteCard card={card} />
                        </div>
                      );
                    })}
                  </div>
                </article>
              )}
            </div>
          </div>
          {/* subscription */}
          <div className="bg-[#EAF4E2] border-[#8ED06C] p-5 rounded-lg border-2 max-w-[422px]">
            <div>
              <h1 className="text-[#333333] text-[24px] font-bold text-center">
                Choose Subscription Plan
              </h1>
              <p className="text-[16px] font-bold text-[#6E6E6E] text-center">
                Get the best service with out <br /> subscription plans tailored
                to make <br /> streaming fun and live.
              </p>
            </div>

            <div className="space-y-5">
              <div className="bg-[#004324] border-2 border-[#8ED06C] p-4 rounded-2xl flex gap-4 items-center">
                <div>
                  <h1 className="text-[#8ED06C] font-bold">Free Plan</h1>
                  <p className="text-[#ffffff] font-bold text-[24px]">
                    0.00$ /<span className="text-[14px]">Month</span>
                  </p>
                  <p className="text-[#ffffff] font-bold">0.00$/Year</p>
                  <div className="mt-5">
                    <button className="text-[#8ED06C] border-[#8ED06C] text-sm border-2 p-2 font-bold rounded-md">
                      Choose Plan
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-[#F5F5F5] font-bold text-[12px]">
                    You Get
                  </h1>
                  <h1 className="text-[#FFFFFF] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />1 User Access only you
                  </h1>
                  <h1 className="text-[#FFFFFF] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    Basic Analytics Insight
                  </h1>
                  <h1 className="text-[#FFFFFF] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    48-hours email response
                  </h1>
                  <h1 className="text-[#FFFFFF] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    Basic Security Features
                  </h1>
                  <h1 className="text-[#FFFFFF] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    Limited to 10 products listings
                  </h1>
                  <h1 className="text-[#FFFFFF] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    Basic Social Sharing
                  </h1>
                  <h1 className="text-[#FFFFFF] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    Free domain that ends with .mynile.store
                  </h1>
                </div>
              </div>

              <div className="border-2 border-[#8ED06C] p-4 rounded-2xl flex gap-4 items-center">
                <div>
                  <h1 className="text-[#8ED06C] font-bold">Premiun Plan</h1>
                  <p className="text-[#333333] font-bold text-[24px]">
                    1.99$ /
                    <span className="text-[14px] text-[#6E6E6E]">Month</span>
                  </p>
                  <p className="text-[#333333] font-bold">
                    20.19${" "}
                    <span className="text-[14px] text-[#6E6E6E]">/Year</span>
                  </p>
                  <div className="mt-5">
                    <button className="text-[#8ED06C] border-[#8ED06C] text-sm border-2 p-2 font-bold rounded-md">
                      Choose Plan
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-[#333333] font-bold text-[12px]">
                    You Get
                  </h1>
                  <h1 className="text-[#6E6E6E] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />4 User Access including you
                  </h1>
                  <h1 className="text-[#6E6E6E] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    24/7 Priority Support
                  </h1>
                  <h1 className="text-[#6E6E6E] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    Deep dive analytics & Support
                  </h1>
                  <h1 className="text-[#6E6E6E] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    Advanced Security & Backup Solution
                  </h1>
                  <h1 className="text-[#6E6E6E] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    Unlimited products listings
                  </h1>
                  <h1 className="text-[#6E6E6E] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    Full social media integration
                  </h1>
                  <h1 className="text-[#6E6E6E] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    Personalized business <br /> Domain that end with .com.ng
                  </h1>
                  <h1 className="text-[#6E6E6E] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    Integrated reviews and ratings
                  </h1>
                </div>
              </div>

              <div className="border-2 border-[#8ED06C] p-4 rounded-2xl flex gap-4 items-center">
                <div>
                  <h1 className="text-[#8ED06C] font-bold">Enterprise Plan</h1>
                  <p className="text-[#333333] font-bold text-[14px]">
                    Message us for pricing
                  </p>
                  <div className="mt-5">
                    <button className="text-[#8ED06C] border-[#8ED06C] text-sm border-2 p-2 font-bold rounded-md">
                      Chat with us
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-[#333333] font-bold text-[12px]">
                    You Get
                  </h1>
                  <h1 className="text-[#6E6E6E] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    All premium plan features
                  </h1>
                  <h1 className="text-[#6E6E6E] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    Some other features you want or wish to add
                  </h1>
                  <h1 className="text-[#6E6E6E] text-[12px] flex items-center gap-2">
                    <img src={done} alt="" />
                    Advanced Security & Backup Solution
                  </h1>
                </div>
              </div>

              {/* Upgrade Button */}
              <div className="flex justify-center mt-10">
                <Upgrade />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlanSetting;
