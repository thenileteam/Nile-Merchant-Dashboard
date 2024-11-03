import React, { useState } from "react";
import { arrowleft, image, notification } from "../../assets";
import { Link } from "react-router-dom";
import SaveChanges from "../Popup Modals/SaveChanges";

const ShippingSetting = () => {
  return (
    <div>
      <div>
        {/* Navbar */}
        <nav className="bg-[#EAF4E2] p-4 shadow-md flex items-center justify-center gap-5 fixed w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/store">
                <img src={arrowleft} alt="" />
              </Link>
              <h1 className="text-[32px] font-bold">Shipping Settings</h1>
            </div>
            <div className="flex items-center gap-10 ml-[500px]">
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
      <div>
        <div className="flex justify-center">
          <div className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 p-5 rounded-lg">
            <h1 className="text-[#333333] text-[18px] font-bold">
              Choose Your Shipping Method
            </h1>
            <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md w-[325px]">
              <h1 className="text-gray-500 font-bold">
                Handle Shipping Yourself
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
            <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md w-[325px]">
              <h1 className="text-gray-500 font-bold">
                Use In-App Shipping Services
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
            <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md w-[325px]">
              <h1 className="text-gray-500 font-bold">Instore Pickup</h1>
              <div className="flex items-center">
                &#8203;
                <input
                  type="checkbox"
                  className="size-4 rounded border-gray-300"
                  id="Option2"
                />
              </div>
            </div>
            {/* Save Changes */}
            <div className="flex items-center justify-center gap-16 mt-10">
              <SaveChanges />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingSetting;
