import React from "react";
import {
  addlogo,
  arrowleft,
  coverimage,
  image,
  logout,
  notification,
  profileimage,
  store1,
} from "../../assets";
import { Link } from "react-router-dom";
import SaveChanges from "../Popup Modals/SaveChanges";

const PaymentSetting = () => {
  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="bg-[#EAF4E2] p-4 shadow-md flex items-center justify-center gap-5 fixed w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/store">
                <img src={arrowleft} alt="" />
              </Link>
              <h1 className="text-[32px] font-bold">
                Payment & Checkout Settings
              </h1>
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

      {/* Input Fields */}
      <div className="grid grid-cols-3 px-28 gap-6 justify-center mx-auto place-items-center">
        <form
          action="#"
          className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg"
        >
          <div>
            <h1 className="text-[20px] text-[#004324] font-bold">
              Payment Method
            </h1>
            <p className="text-[#6E6E6E] text-sm">
              Control how payment are made and processed
            </p>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
            <h1 className="text-gray-500 font-bold">Bank Transfer</h1>
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
              />
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
            <h1 className="text-gray-500 font-bold">Credit Card</h1>
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
              />
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
            <h1 className="text-gray-500 font-bold">Cash On Delivery</h1>
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
              />
            </div>
          </div>
        </form>

        <form
          action="#"
          className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg"
        >
          <div>
            <h1 className="text-[20px] text-[#004324] font-bold">
              Payment Authorization
            </h1>
            <p className="text-[#6E6E6E] text-sm">
              Choose whether how to charge a customer’s card at the time of
              purshase or manually{" "}
            </p>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
            <h1 className="text-gray-500 font-bold">
              Automatically Capture Payment
            </h1>
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
              />
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
            <h1 className="text-gray-500 font-bold">
              Manually Authorize Transaction
            </h1>
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
              />
            </div>
          </div>
        </form>

        <form
          action="#"
          className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-5 rounded-lg"
        >
          <div>
            <h1 className="text-[20px] text-[#004324] font-bold">
              Shipping Tracking
            </h1>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
            <h1 className="text-gray-500 font-bold">
              Automatically Capture Payment
            </h1>
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
              />
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
            <h1 className="text-gray-500 font-bold">
              Automatically Capture Payment
            </h1>
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
              />
            </div>
          </div>
        </form>

        <form
          action="#"
          className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-5 rounded-lg"
        >
          <div>
            <h1 className="text-[20px] text-[#004324] font-bold">Currency</h1>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
            <h1 className="text-gray-500 font-bold">USD</h1>
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
              />
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
            <h1 className="text-gray-500 font-bold">NAIRA</h1>
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
              />
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
            <h1 className="text-gray-500 font-bold">GBP</h1>
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
              />
            </div>
          </div>
        </form>

        <form
          action="#"
          className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-5 rounded-lg"
        >
          <div>
            <h1 className="text-[20px] text-[#004324] font-bold">
              Customer’s Contact Method
            </h1>
            <p className="text-[#6E6E6E] text-sm">
              The contact method customers enter at checkout will receive order
              & shipping notifications
            </p>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
            <h1 className="text-gray-500 font-bold">Phone Number</h1>
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
              />
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
            <h1 className="text-gray-500 font-bold">Email</h1>
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
              />
            </div>
          </div>
        </form>

        <form
          action="#"
          className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-5 rounded-lg"
        >
          <div>
            <h1 className="text-[20px] text-[#004324] font-bold">
              Customer Name
            </h1>
            <p className="text-[#6E6E6E] text-sm">
              Choose which name customers to enter while checking out
            </p>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
            <h1 className="text-gray-500 font-bold">Only First Name</h1>
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
              />
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
            <h1 className="text-gray-500 font-bold">First Name & Last Name</h1>
            <div className="flex items-center">
              &#8203;
              <input
                type="checkbox"
                className="size-4 rounded border-gray-300"
                id="Option2"
              />
            </div>
          </div>
        </form>
      </div>

      <div className="flex justify-center mt-10">
        <SaveChanges />
      </div>
    </>
  );
};

export default PaymentSetting;
