import React from "react";
import { arrowleft, image, notification } from "../../assets";
import { Link } from "react-router-dom";

const DomainSetting = () => {
  return (
    <div>
      <div>
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
        <div className="flex justify-center gap-20">
          <div className="space-y-5">
            <div className=" bg-[#EAF4E2] border-[#8ED06C] border-2 p-5 rounded-lg w-[375px]">
              <h1 className="text-[#333333] text-[20px] font-bold">
                Your Store URL
              </h1>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  className="bg-[#ffffff] p-3 w-[327px]"
                  placeholder="www.kulevshoes.mynile.store"
                />
                <button className="bg-[#004324] p-3 px-5 text-[#ffffff] rounded-md">
                  Edit
                </button>
              </div>
            </div>
            <div className=" bg-[#EAF4E2] border-[#8ED06C] border-2 p-5 rounded-lg w-[375px]">
              <h1 className="text-[#333333] text-[16px] font-bold">
                Get Domain Or Connect A Domain
              </h1>
              <p className="text-[12px] text-[#6E6E6E] font-bold">
                Secure a perfect personalized domain for your store or connect
                an existing one you purshased from third party Apps
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <h1 className="text-[#004324] text-[24px] font-bold text-center">
                Connect Existing Domain
              </h1>
            </div>
            <div className=" bg-[#EAF4E2] border-[#8ED06C] border-2 p-5 rounded-lg w-[376px]">
              <h1 className="text-[#333333] text-[16px] font-bold">
                Enter your domain name
              </h1>
              <div>
                <input
                  type="text"
                  className="bg-[#ffffff] p-3 w-[327px]"
                  placeholder="E.g; Example.com.ng"
                />
                <div className="flex justify-end mt-3">
                  <button className="bg-[#004324] p-3 px-5 text-[#ffffff] rounded-md">
                    Next
                  </button>
                </div>
              </div>
            </div>
            <div className=" bg-[#EAF4E2] border-[#8ED06C] border-2 p-5 rounded-lg w-[375px]">
              <h1 className="text-[#333333] text-[16px] font-bold">
                Verify Domain Ownership
              </h1>
              <p className="text-[12px] text-[#6E6E6E] font-bold">
                To connect your domain,create the following DNS record in your
                domain provider account settings.
              </p>
              <h2 className="text-[#004324] font-bold text-[12px] mt-2">
                Just Copy It
              </h2>
            </div>
            <div className=" bg-[#EAF4E2] border-[#8ED06C] border-2 p-5 rounded-lg w-[375px]">
              <div>
                <h1 className="text-[#333333] text-[16px] font-bold">
                  A Record
                </h1>
                <p className="text-[12px] text-[#6E6E6E] font-bold">
                  Name: <span className="text-[#8ED06C]">@</span>
                </p>
                <p className="text-[12px] text-[#6E6E6E] font-bold">
                  Required Value:{" "}
                  <span className="text-[#8ED06C]">23.227.38.65</span>
                </p>
              </div>
              <div>
                <h1 className="text-[#333333] text-[16px] font-bold">CNAME</h1>
                <p className="text-[12px] text-[#6E6E6E] font-bold">
                  Name: <span className="text-[#8ED06C]">www</span>
                </p>
                <p className="text-[12px] text-[#6E6E6E] font-bold">
                  Required Value:{" "}
                  <span className="text-[#8ED06C]">mynile.store</span>
                </p>
              </div>
              <div>
                <h1 className="text-[#333333] text-[16px] font-bold">
                  TXT Record
                </h1>
                <p className="text-[12px] text-[#6E6E6E] font-bold">
                  Name:{" "}
                  <span className="text-[#8ED06C]">nile_verification</span>
                </p>
                <p className="text-[12px] text-[#6E6E6E] font-bold">
                  Required Value:{" "}
                  <span className="text-[#8ED06C]">
                    023u69gfcshuis08643dvjsfg.,jhur
                  </span>
                </p>
              </div>
              <div className="flex justify-center mt-5">
                <button className="bg-[#004324] p-3 px-5 text-[#ffffff] rounded-md">
                  Verify Connection
                </button>
              </div>
            </div>{" "}
            <br />
            <br />
          </div>

          <div className="space-y-5">
            <div>
              <h1 className="text-[#004324] text-[24px] font-bold text-center">
                Connect Existing Domain
              </h1>
            </div>
            <div className=" bg-[#EAF4E2] border-[#8ED06C] border-2 p-5 rounded-lg w-[375px]">
              <h1 className="text-[#333333] text-[16px] font-bold">
                Search Domain
              </h1>
              <div className="relative">
                <label htmlFor="Search" className="sr-only">
                  {" "}
                  Search{" "}
                </label>

                <input
                  type="text"
                  id="Search"
                  placeholder="Kulevshoes"
                  className="w-full rounded-md border-gray-200 py-3 p-3 pe-10 shadow-sm sm:text-sm"
                />

                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
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
                      stroke="#8ED06C"
                      className="size-6"
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
            </div>

            <div className=" bg-[#EAF4E2] border-[#8ED06C] border-2 p-5 rounded-lg w-[375px]">
              <h1 className="text-[#333333] text-[16px] font-bold">
                Kulevshoes.com.ng isn't avalaible
              </h1>
              <p className="text-[12px] text-[#6E6E6E] font-bold">
                The Domain you entered is unavailable, you can choose from the
                sugested domains below
              </p>
            </div>

            <div className=" bg-[#EAF4E2] border-[#8ED06C] border-2 p-5 rounded-lg w-[375px] space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-[#6E6E6E] text-[16px] font-bold">
                  Kulev.com.ng
                </h1>
                <button className="bg-[#8ED06C] font-bold text-[#ffffff] p-3 rounded-lg">
                  Get Domain
                </button>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="text-[#6E6E6E] text-[16px] font-bold">
                  Kulevshoe.com.ng
                </h1>
                <button className="bg-[#8ED06C] font-bold text-[#ffffff] p-3 rounded-lg">
                  Get Domain
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainSetting;
