/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  nilelogowhite,
  notification,
  bitcoingraph,
  bitcoinbag,
  bitcoin,
  bitcoindown,
  moneysend,
} from "../assets";
import FinancialTable from "../Components/Financial/FinancialTable";
import { useUserStore } from "@/zustandStore";
import Sidebar from '../Components/Sidebar/Sidebar'
import { useFetchUser } from "@/datahooks/users/userhooks";
import Navbar from "@/Components/Navbar/Navbar";
const FinancialManagement = () => {
  const {user} = useFetchUser() 
  const {sidebarOpen, setSidebarOpen, closeSidebar, isCollapsed} = useUserStore();
  return (
    <>
      <div className="bg-[#F5F5F5] pb-20">
        <div className="flex">
          <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
          {/* Navbar */}
          <div className={isCollapsed? 'flex-grow lg:ml-20 overflow-x-hidden':"flex-grow lg:ml-56 overflow-x-hidden"}>
          <Navbar
              title="Financial Management"
              icon={bitcoingraph}
              profilePic={user && user.image ? user.image : ""}
            />
            {/* Cards */}
            <div className="p-6 mt-28 px-32">
              <div className="flex gap-28">
                <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                  <img src={bitcoinbag} alt="" />
                  <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                    0
                  </h1>
                  <p className="text-[#6E6E6E]">Total Revenue</p>
                </div>
                <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                  <img src={bitcoin} alt="" />
                  <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                    0
                  </h1>
                  <p className="text-[#6E6E6E]">Pending Payouts</p>
                </div>
                <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                  <img src={bitcoindown} alt="" />
                  <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                    0
                  </h1>
                  <p className="text-[#6E6E6E]">Total Revenue For The Month</p>
                </div>
              </div>
            </div>

            <div className="px-24 mt-32">
              <div>
                <img
                  src={moneysend}
                  alt=""
                  className="flex justify-center mx-auto"
                />
                <h1 className="text-[24px] font-extrabold text-center">
                  Nothing To See Yet
                </h1>
                <p className="text-[#6E6E6E] font-bold text-center">
                  Go Make sales and request for your funds here
                </p>
              </div>
              <div className="flex justify-center mt-3">
                <Link to="/dashboard">
                  <button className="text-[#ffffff] bg-[#004324] p-3 font-bold rounded-md">
                    Go To Dashboard
                  </button>
                </Link>
              </div>
            </div>

            <div>
              <FinancialTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialManagement;
