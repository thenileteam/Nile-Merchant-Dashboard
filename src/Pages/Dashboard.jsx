/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import {
  bitcoin,
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
import {
  useFetchDashboardData,
  useFetchUser,
} from "../datahooks/users/userhooks";
import Skeleton from "react-loading-skeleton";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
const Dashboard = () => {
  //users image
  const { user } = useFetchUser();
  const { dashboardData, isFetchingDashboardData, dashboardDataisError } =
    useFetchDashboardData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // console.log(dashboardData, "dashboard data");
  const closeSidebar = () => {
    if (sidebarOpen) setSidebarOpen(false);
  };
  //getting username from zustand store
  const username =
    user && user.name ? user.name.split(" ")[0].toUpperCase() : "User";
  // console.log(username);

  return (
    <>
      <div className="bg-[#F5F5F5] pb-20 overflow-x-hidden">
        <div className="flex  ">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
          {/* Navbar */}
          <div className="flex-grow lg:ml-52">
            <Navbar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              title={`Welcome ${username}`}
              profilePic={user && user.image ? user.image : ""}
            />

            {/* Cards */}
            {isFetchingDashboardData ? (
              <div className=" w-full mt-28 px-32  h-40 flex lg:flex-row gap-20">
                <div className=" h-[150px] bg-zinc-200  w-[300px]" />
                <div className=" h-[150px] bg-zinc-200 w-[300px]" />
                {/* <div className=" h-[150px] bg-zinc-200 w-[300px]" /> */}
              </div>
            ) : (
              <div className="p-6 mt-28 px-36">
                <div className="flex gap-20">
                  <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                    <img src={transaction} alt="" />
                    <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                      0
                    </h1>
                    <p className="text-[#6E6E6E]">Revenue</p>
                  </div>
                  <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                    <img src={packagemoving} alt="" />
                    <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                      {dashboardData?.orders?.totalOrders}
                    </h1>
                    <p className="text-[#6E6E6E]">Total sales</p>
                  </div>
                  {/* <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                    <img src={bitcoin} alt="" />
                    <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                      0
                    </h1>
                    <p className="text-[#6E6E6E]">Total Payouts</p>
                  </div> */}
                </div>
              </div>
            )}

            {/* Line */}
            <div className="px-32">
              <div className="border-2 border-white shadow-[0px_4px_10px_rgba(0,0,0,0.3)]"></div>
            </div>

            {/* <div className="px-36 mt-10 space-y-7">
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
            </div> */}

            <div>
              <DashoardTabel
                dashboardData={dashboardData}
                isFetchingDashboardData={isFetchingDashboardData}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
