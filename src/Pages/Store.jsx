import React, { useState } from "react";
import { Link } from "react-router-dom";
import Links from "../Links";
import {
  image,
  nilelogowhite,
  notification,
  store1,
  accountsetting,
  arrow,
  store,
  dollar,
  profile,
  notification2,
  bank,
  invoice,
  containertruck,
  websecurity,
  delete1,
} from "../assets";
import DeleteAccount from "../Components/Store/DeleteAccount";

const Store = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    if (sidebarOpen) setSidebarOpen(false);
  };
  return (
    <>
      <div className="bg-[#F5F5F5] pb-20">
        <div className="flex">
          {/* Overlay for small screens */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 lg:hidden"
              onClick={closeSidebar}
            ></div>
          )}

          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-[290px] z-10 bg-[#004324] border-2 text-white p-5 transition-transform transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0`}
          >
            <img
              src={nilelogowhite}
              alt=""
              className="w-[170px] flex mx-auto"
            />
            <Links />
          </div>

          {/* Navbar */}
          <div className="flex-grow lg:ml-64 overflow-x-hidden">
            <nav className="bg-[#EAF4E2] p-4 shadow-md flex items-center gap-5 fixed w-full">
              <button
                className="lg:hidden text-gray-800 z-20"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      sidebarOpen
                        ? "M6 18L18 6M6 6l12 12" // Close icon
                        : "M4 6h16M4 12h16M4 18h16" // Menu icon
                    }
                  />
                </svg>
              </button>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-20">
                  <img src={store1} alt="" />
                  <h1 className="text-[32px] font-bold">Store Settings</h1>
                </div>
                <div className="flex items-center gap-10 ml-[130px]">
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
            
            {/* Cards */}
            <div className="px-10 mt-40 ml-10">
              <div className="grid grid-cols-3 gap-6">
                <Link to="/profilesetting">
                  <div className="flex items-center justify-between bg-[#EAF4E2] border-[#8ED06C] border-2 rounded-md w-[322.89px] h-[192px] p-5">
                    <div>
                      <img src={accountsetting} alt="" />
                      <div className="mt-5">
                        <h1 className="text-[#333333] font-bold">
                          Profile Settings
                        </h1>
                        <p className="text-[#6E6E6E]">
                          Provide personal details and how you log in to your
                          store
                        </p>
                      </div>
                    </div>
                    <div>
                      <img src={arrow} alt="" className="w-9" />
                    </div>
                  </div>
                </Link>

                <Link to="/storesetting">
                  <div className="flex items-center justify-between bg-[#EAF4E2] border-[#8ED06C] border-2 rounded-md w-[322.89px] p-5">
                    <div>
                      <img src={store} alt="" />
                      <div className="mt-5">
                        <h1 className="text-[#333333] font-bold">
                          Store Settings
                        </h1>
                        <p className="text-[#6E6E6E]">
                          Provide right informations your store need and set up
                          how your store should look
                        </p>
                      </div>
                    </div>
                    <div>
                      <img src={arrow} alt="" className="w-14" />
                    </div>
                  </div>
                </Link>

                <Link to="/paymentsetting">
                  <div className="flex items-center justify-between bg-[#EAF4E2] border-[#8ED06C] border-2 rounded-md w-[322.89px] h-[192px] p-5">
                    <div>
                      <img src={dollar} alt="" />
                      <div className="mt-5">
                        <h1 className="text-[#333333] font-bold">
                          Payment & Checkout Settings
                        </h1>
                        <p className="text-[#6E6E6E]">
                          Manage your store’s payment options and checkout
                          preferences
                        </p>
                      </div>
                    </div>
                    <div>
                      <img src={arrow} alt="" className="w-10" />
                    </div>
                  </div>
                </Link>

                <Link to="/usersetting">
                  <div className="flex items-center justify-between bg-[#EAF4E2] border-[#8ED06C] border-2 rounded-md w-[322.89px] p-5">
                    <div>
                      <img src={profile} alt="" />
                      <div className="mt-5">
                        <h1 className="text-[#333333] font-bold">
                          Users & Permission Settings
                        </h1>
                        <p className="text-[#6E6E6E]">
                          Manage the team members who have access to your store
                          and assign them the appropriate roles and permission.
                        </p>
                      </div>
                    </div>
                    <div>
                      <img src={arrow} alt="" className="w-16" />
                    </div>
                  </div>
                </Link>

                <Link to="/notificationsetting">
                  <div className="flex items-center justify-between bg-[#EAF4E2] border-[#8ED06C] border-2 rounded-md w-[322.89px] h-[216px] p-5">
                    <div>
                      <img src={notification2} alt="" />
                      <div className="mt-5">
                        <h1 className="text-[#333333] font-bold">
                          Notifications Settings
                        </h1>
                        <p className="text-[#6E6E6E]">
                          Choose how you want to receive update on your store
                          activity,updates and suspicious activity on your
                          account
                        </p>
                      </div>
                    </div>
                    <div>
                      <img src={arrow} alt="" className="w-16" />
                    </div>
                  </div>
                </Link>

                <Link to="/banksetting">
                  <div className="flex items-center justify-between bg-[#EAF4E2] border-[#8ED06C] border-2 rounded-md w-[322.89px] h-[213px] p-3">
                    <div>
                      <img src={bank} alt="" />
                      <div className="mt-5">
                        <h1 className="text-[#333333] font-bold">
                          Bank Settings
                        </h1>
                        <p className="text-[#6E6E6E]">
                          Set how you want to receive payout directly from your
                          App.
                        </p>
                      </div>
                    </div>
                    <div>
                      <img src={arrow} alt="" className="w-9" />
                    </div>
                  </div>
                </Link>

                <Link to="/plansetting">
                  <div className="flex items-center justify-between bg-[#EAF4E2] border-[#8ED06C] border-2 rounded-md w-[322.89px] p-3">
                    <div>
                      <img src={invoice} alt="" />
                      <div className="mt-5">
                        <h1 className="text-[#333333] font-bold">
                          Plan & Billing Settings
                        </h1>
                        <p className="text-[#6E6E6E]">
                          Upgrade your account and choose your preferable way of
                          paying your subscription
                        </p>
                      </div>
                    </div>
                    <div>
                      <img src={arrow} alt="" className="w-12" />
                    </div>
                  </div>
                </Link>

                <Link to="/shippingsetting">
                  <div className="flex items-center justify-between bg-[#EAF4E2] border-[#8ED06C] border-2 rounded-md w-[322.89px] p-3">
                    <div>
                      <img src={containertruck} alt="" />
                      <div className="mt-5">
                        <h1 className="text-[#333333] font-bold">
                          Shipping & Delivery Settings
                        </h1>
                        <p className="text-[#6E6E6E]">
                          Manage your shipping preferences,rates and delivery
                          options.
                        </p>
                      </div>
                    </div>
                    <div>
                      <img src={arrow} alt="" className="w-9" />
                    </div>
                  </div>
                </Link>

                <Link to="/domainsetting">
                  <div className="flex items-center justify-between bg-[#EAF4E2] border-[#8ED06C] border-2 rounded-md w-[322.89px] p-3">
                    <div>
                      <img src={websecurity} alt="" />
                      <div className="mt-5">
                        <h1 className="text-[#333333] font-bold">
                          Domain Management
                        </h1>
                        <p className="text-[#6E6E6E]">
                          Get your personalized paid domain from Nile or connect
                          your existing domain to your store.
                        </p>
                      </div>
                    </div>
                    <div>
                      <img src={arrow} alt="" className="w-12" />
                    </div>
                  </div>
                </Link>

                <div>
                  <DeleteAccount />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
