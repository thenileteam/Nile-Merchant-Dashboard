/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Links from "../Links";
import {
  bitcoin,
  nilelogowhite,
  notification,
  packagemoving,
  store,
  transaction,
  arrow,
  packagemoving1,
  truck,
  dollar,
  bank,
} from "../assets";
import DashoardTabel from "../Components/Dashboard/DashoardTabel";
import { useState } from "react";
import { useFetchDashboardData } from "../datahooks/users/userhooks";
import PlaceholderImage from "../Components/PlaceholderImage/PlaceholderImage";
import Skeleton from "react-loading-skeleton";

const Dashboard = () => {
  const { dashboardData, isFetchingDashboardData, dashboardDataisError } =
    useFetchDashboardData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  console.log(dashboardData, "dashboard data");
  const closeSidebar = () => {
    if (sidebarOpen) setSidebarOpen(false);
  };

  return (
    <>
      <section className="bg-[#F5F5F5]">
        {/* inner container */}
        <div className="container border-2 border-purple-600 mx-auto">
          {/* Overlay for small screens */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 lg:hidden"
              onClick={closeSidebar}
            ></div>
          )}

          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-[290px] z-10 bg-[#004324] border-2 text-white p-5 transition-transform transform   ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0`}
          >
            <img
              src={nilelogowhite}
              alt="nile logo"
              className="w-[170px] flex mx-auto"
            />
            <Links />
          </div>

          {/* Navbar */}
             <nav className="bg-[#EAF4E2] p-[12px] lg:p-4 shadow-md flex items-center lg:gap-5 w-full fixed top-0 right-0 left-0 border-red-600 border-2">
              <button
                className="lg:hidden text-gray-800 z-20"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6  "
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
              {/* child two */}
               <div className="lg:flex lg:items-center lg:justify-between border-2 border-yellow-500 max-w-[1322px] mx-auto">
                <div className=" ">
                  <h1 className="text-[32px] font-bold ml-20 hidden lg:block">Welcome User</h1>
                  <h1 className="text-xl text-pryGreen font-bold lg:hidden text-center">Dashboard Overview</h1>
                </div>
                <div className="flex items-center gap-10 ml-[450px]">
                  <div className="relative">
                    <label htmlFor="Search" className="sr-only">
                      {" "}
                      Search{" "}
                    </label>

                    <input
                      type="text"
                      id="Search"
                      placeholder=""
                      className="lg:w-[300px] hidden lg:block rounded-md border-[#6E6E6E] border-2 p-8 py-2.5 pe-10 shadow-sm sm:text-sm "
                    />

                    <span className="absolute inset-y-0 start-0 hidden lg:grid w-10 lg:place-content-center">
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
                    <Link to="/notification" className='border-2 border-red-50'>
                      <img src={notification} alt="notification icon" />
                    </Link>
                  </div>
                  <div>
                    <Link to="/profilesetting" className="hidden lg:block">
                      <PlaceholderImage/>
                    </Link>
                  </div>
                </div>
              </div>
            </nav> 
               {/* lg:fixed lg:h-screen lg:top-[113px] */}
          {/* Cards */}
          <div className="lg:flex-grow lg:right-0 overflow-y-scroll border-blue-600 border-2">
            {isFetchingDashboardData ? (
              <div className=" w-full mt-28 px-32 h-40 flex flex-row gap-28">
                <div className=" h-[150px] bg-zinc-200  w-[300px]" />
                <div className=" h-[150px] bg-zinc-200 w-[300px]" />
                <div className=" h-[150px] bg-zinc-200 w-[300px]" />
              </div>
            ) : (
              <div className="mt-[40px] lg:w-[979px] mx-auto  ">
                <div className="flex gap-28">
                  <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                    <img src={transaction} alt="" />
                    <h1 className="text-[#333333] text-[22px] font-bold mt-1 border-blue-400">
                      0
                    </h1>
                    <p className="text-[#6E6E6E]">Avalaible Balance</p>
                  </div>
                  <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                    <img src={packagemoving} alt="" />
                    <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                      {dashboardData?.orders?.totalOrders}
                    </h1>
                    <p className="text-[#6E6E6E]">Total sales</p>
                  </div>
                  <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                    <img src={bitcoin} alt="" />
                    <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                      0
                    </h1>
                    <p className="text-[#6E6E6E]">Total Payouts</p>
                  </div>
                </div>
              </div>
            )}

            {/* Line */}
              <div className="mt-8 hidden lg:block lg:w-[1020px]  mx-auto border-2 border-white shadow-[0px_4px_10px_rgba(0,0,0,0.3)]"></div>
 
              <div className="px-24 mt-10 space-y-7">
              <div className="flex items-center justify-between">
                <Link to="/storesetting">
                  <div className="flex items-center justify-between w-[469px] h-[122px] border-[#8ED06C] border-2 bg-[#ffffff] p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <img src={store} alt="" />
                      <div>
                        <h1>Setup Your Store</h1>
                        <p className="text-[#6E6E6E]">
                          Complete the informations and get your store up and
                          running
                        </p>
                      </div>
                    </div>
                    <img src={arrow} alt="" />
                  </div>
                </Link>

                <Link to="/product">
                  <div className="flex items-center justify-between w-[469px] h-[122px] border-[#8ED06C] border-2 bg-[#ffffff] p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <img src={packagemoving1} alt="" />
                      <div>
                        <h1>Post Your First Product</h1>
                        <p className="text-[#6E6E6E]">
                          Show your customers what you are here to offer and how
                          you can help them
                        </p>
                      </div>
                    </div>
                    <img src={arrow} alt="" />
                  </div>
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <Link to="/shippingsetting">
                  <div className="flex items-center justify-between w-[469px] h-[122px] border-[#8ED06C] border-2 bg-[#ffffff] p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <img src={truck} alt="" />
                      <div>
                        <h1>Add Your Shipping Methods</h1>
                        <p className="text-[#6E6E6E]">
                          Complete your shipping informations and start shipping
                          your product safely
                        </p>
                      </div>
                    </div>
                    <img src={arrow} alt="" />
                  </div>
                </Link>

                <Link to="/paymentsetting">
                  <div className="flex items-center justify-between w-[469px] h-[122px] border-[#8ED06C] border-2 bg-[#ffffff] p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <img src={dollar} alt="" />
                      <div>
                        <h1>Setup Your Checkout</h1>
                        <p className="text-[#6E6E6E]">
                          Set how your customers pay for your product while
                          checking out
                        </p>
                      </div>
                    </div>
                    <img src={arrow} alt="" />
                  </div>
                </Link>
              </div>

              <div className="flex justify-center">
                <Link to="/banksetting">
                  <div className="flex items-center justify-between w-[469px] h-[122px] border-[#8ED06C] border-2 bg-[#ffffff] p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <img src={bank} alt="" />
                      <div>
                        <h1>Add Your Bank Details</h1>
                        <p className="text-[#6E6E6E]">
                          Input your correct bank details in order for you start
                          receiving your money
                        </p>
                      </div>
                    </div>
                    <img src={arrow} alt="" />
                  </div>
                </Link>
              </div>
            </div>
            <div>
              <DashoardTabel
                dashboardData={dashboardData}
                isFetchingDashboardData={isFetchingDashboardData}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
