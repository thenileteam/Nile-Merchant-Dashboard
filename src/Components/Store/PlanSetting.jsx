import { useState } from "react";
import {
  add,
  addlogo,
  arrowleft,
  coverimage,
  done,
  image,
  logout,
  notification,
  store1,
} from "../../assets";
import SaveCard from "../PopupModals/SaveCard";
import Upgrade from "../PopupModals/Upgrade";
import Navbar from "../Navbar/Navbar";
import { useFetchUser } from "@/datahooks/users/userhooks";
import { useSidebarStore } from "@/ZustandStores/sidebarStore";
import { useForm } from "react-hook-form";
import { useCreateCard } from "@/datahooks/billinghooks/useBillinghook";
const PlanSetting = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useFetchUser();
  const { isCollapsed } = useSidebarStore();
  const [showBilling, setShowBilling] = useState(false);
  const [addPayment, setAddPayment] = useState(true);
  const [showCard, setShowCard] = useState(false)
  const {addCardToBackend, cardPending} = useCreateCard()
  const handleShowBillingAndHidePaymentButton = () => {
    setShowBilling(true);
    setAddPayment(false);
  };
  const showSavedCardAndHideForm = () => {
    setShowBilling(false)
    setShowCard(true)
  }
  const addCard = () => {
    
  }
  return (
    <>
      <div>
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

        {/* Input Field */}
        <div
          className={` mt-24 ${
            isCollapsed ? "ml-20" : "ml-64"
          }  flex justify-center gap-10`}
        >
          <div className="space-y-7">
            <div className="bg-[#EAF4E2] border-[#8ED06C] border-2  p-4 rounded-lg">
              <h1 className="text-[#004324] text-[20px] font-bold">
                Plan Details
              </h1>
              <p className="text-[#8ED06C] font-bold text-sm">
                You’re on a free plan
              </p>
            </div>

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
                  onClick={handleShowBillingAndHidePaymentButton}
                >
                  <img src={add} alt="" />
                  <span className="text-[#004324] font-bold">
                    Add Payment Method Below
                  </span>
                </button>
              </div>
            <form
              className={`${
                showBilling ?"visible" : "invisible"
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
              <div>
                <label
                  htmlFor="cardNumber"
                  className="text-[16px] font-bold text-[#333333]"
                >
                  Card Number
                </label>

                <input
                  type="text"
                  {...register("cardNumber", {
                    required: "card name is required",
                  })}
                  placeholder="xxxx xxxx xxxx xxxx"
                  className="mt-1 w-full p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
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
                    })}
                    placeholder="MM/YY"
                    className="mt-1 w-full p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="text-[16px] font-bold text-[#333333] block full"
                  >
                    CVV
                  </label>

                  <input
                    type="text"
                    {...register("cvv", { required: "cvv is required" })}
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
                  htmlFor="StoreName"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  Zip/Postal Code
                </label>

                <input
                  type="text"
                  {...register("expiryDate")}
                  placeholder="xxxxx"
                  className="mt-1 w-full p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div className="flex justify-center mt-10">
                <SaveCard showSavedCardAndHideForm={showSavedCardAndHideForm}/>
              </div>
            </form>
              {/* saved card */}
             { showCard&&<article className="border-2 border-lightGreen bg-[#EAF4E2] w-[375px] rounded-md p-2 absolute top-[200px]">
                <h3 className="text-green font-bold text-xl">Billing Cycle</h3>
                <span className="text-lightBlack font-bold my-1 block">
                  Your Next Billing is on the Date, Month Year
                </span>
                <div>
                  <img src="" alt="" />
                  <strong className="text-green">XXXXXXXXXXXXX</strong>
                  <button
                    className="bg-transparent float-right underline text-[#DC3545] font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </article>}
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
        <br />
      </div>
    </>
  );
};

export default PlanSetting;
