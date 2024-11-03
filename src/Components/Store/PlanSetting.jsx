import React from "react";
import {
  add,
  addlogo,
  arrowleft,
  coverimage,
  done,
  image,
  logout,
  notification,
  profileimage,
  store1,
} from "../../assets";
import { Link } from "react-router-dom";
import SaveCard from "../Popup Modals/SaveCard";
import Upgrade from "../Popup Modals/Upgrade";

const PlanSetting = () => {
  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="bg-[#EAF4E2] p-4 shadow-md flex items-center justify-center gap-5 fixed w-full">
          <div className="flex items-center justify-between gap-20">
            <div className="flex items-center gap-2">
              <Link to="/store">
                <img src={arrowleft} alt="" />
              </Link>
              <h1 className="text-[32px] font-bold">Plan & Billing Settings</h1>
            </div>
            <div className="flex items-center gap-10 ml-[525px]">
              <div className="relative">
                <label htmlFor="Search" className="sr-only">
                  {" "}
                  Search{" "}
                </label>

                <input
                  type="text"
                  id="Search"
                  placeholder=""
                  className="w-[300px] rounded-md border-[#6E6E6E] border-2 p-8 py-2.5 pe-10 shadow-sm sm:text-sm"
                />

                <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-700"
                  >
                    <span className="sr-only">Search</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              <div>
                <Link to="/notification">
                  <img src={notification} alt="" />
                </Link>
              </div>
              <div>
                <Link to="/profilesetting">
                  <img src={image} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* Input Field */}
      <div className="flex justify-center gap-20 px-28">
        <div className="space-y-7">
          <div className="bg-[#EAF4E2] border-[#8ED06C] border-2 w-[338px] p-4 rounded-lg">
            <h1 className="text-[#004324] text-[20px] font-bold">
              Plan Details
            </h1>
            <p className="text-[#6E6E6E] font-bold text-sm">
              You’re on free plan
            </p>
          </div>

          <div className="space-y-5">
            <h1 className="text-[#004324] text-[24px] font-bold">
              Billing History
            </h1>
            <div className="bg-[#EAF4E2] border-[#8ED06C] border-2 w-[338px] p-4 rounded-lg space-y-3">
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
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="bg-[#EAF4E2] border-[#8ED06C] border-2 w-[375px] p-4 rounded-lg">
            <h1 className="text-[#004324] text-[20px] font-bold">
              Billing Cycle
            </h1>
            <p className="text-[#6E6E6E] font-bold text-sm">
              You’re not being billed for anything right now.
            </p>
            <div className="border-[#004324] border-2 flex items-center justify-center gap-2 p-2 mt-2 rounded-lg">
              <img src={add} alt="" />
              <h1 className="text-[#004324] font-bold">
                Add Payment Method Below
              </h1>
            </div>
          </div>
          <form
            action="#"
            className="space-y-5 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[375px] p-4 rounded-lg"
          >
            <div>
              <label
                htmlFor="CardName"
                className="block text-[16px] font-bold text-[#333333]"
              >
                Card Holder Name
              </label>

              <input
                type="text"
                id="CardName"
                name="card_name"
                placeholder="Enter Name On Card"
                className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="CardNumber"
                className="text-[16px] font-bold text-[#333333]"
              >
                Card Number
              </label>

              <input
                type="text"
                id="CardNumber"
                name="card_number"
                placeholder="xxxx xxxx xxxx xxxx"
                className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="flex items-center">
              <div>
                <label
                  htmlFor="ExpiryDate"
                  className="text-[16px] font-bold text-[#333333]"
                >
                  Expiry Date
                </label>

                <input
                  type="text"
                  id="ExpiryDate"
                  name="expiry_date"
                  placeholder="MM/YY"
                  className="mt-1 w-[128px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="CVV"
                  className="text-[16px] font-bold text-[#333333]"
                >
                  CVV
                </label>

                <input
                  type="text"
                  id="CVV"
                  name="cvv"
                  placeholder="XXX"
                  className="mt-1 w-[128px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="Address"
                className="text-[16px] font-bold text-[#333333] flex items-center"
              >
                Address
              </label>

              <input
                type="text"
                id="Address"
                name="address"
                placeholder="xxxxxxxxxx"
                className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
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
                id="StoreName"
                name="store_name"
                placeholder="xxxxx"
                className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="flex justify-center mt-10">
              <SaveCard />
            </div>
          </form>
        </div>

        <div className="bg-[#EAF4E2] border-[#8ED06C] border-2 w-[456px] p-5 rounded-lg">
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
      <br />
    </>
  );
};

export default PlanSetting;
