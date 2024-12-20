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
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useFetchUser } from "@/datahooks/users/userhooks";
import Navbar from "@/Components/Navbar/Navbar";
import ExpensesTable from "../Components/Financial/ExpensesTable";
import { ExpenseForm } from "@/Components/Financial/ExpenseForm";
import { useExpenseHook } from "@/datahooks/users/expensehook";
import { validateForm } from "@/utils/formatdate";

const FinancialManagement = () => {
  const { user } = useFetchUser();
  const { sidebarOpen, closeSidebar, isCollapsed } = useSidebarStore();
  const [displaySuccessModal, setDisplaySuccessModal] = useState(false);
  const [open, setOpen] = useState(false);

  const [tabs, setTabs] = useState([
    {
      id: 1,
      name: "Finance",
      active: true,
    },
    {
      id: 2,
      name: "Expenses",
      active: false,
    },
  ]);
  let emptyState = false;

  return (
    <>
      <div className="bg-[#F5F5F5] pb-20">
        <div className="flex">
          <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
          {/* Navbar */}
          <div
            className={
              isCollapsed
                ? "flex-grow lg:ml-20 overflow-x-hidden"
                : "flex-grow lg:ml-56 overflow-x-hidden"
            }
          >
            <Navbar
              title="Financial Management"
              icon={bitcoingraph}
              profilePic={user && user.image ? user.image : ""}
            />
            {/* Cards */}
            <div className="p-6 mt-28 px-32">
              <div className=" grid sm:grid-cols-2 space-x-2 lg:grid-cols-3 grid-cols-1 gap-2 lg:gap-28">
                <div className="bg-[#FCDADF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                  <img src={bitcoinbag} alt="" />
                  <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                    0
                  </h1>
                  <p className="text-[#6E6E6E]">Total Revenue</p>
                </div>
                <div className="bg-[#FFE8DF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                  <img src={bitcoin} alt="" />
                  <h1 className="text-[#333333] leading-[25.3px] text-[22px] font-bold mt-1">
                    0
                  </h1>
                  <p className="text-[#6E6E6E]  leading-4  font-bold text-[14px]  tracking-[1%]">
                    Total Expences
                  </p>
                </div>
                <div className="bg-[#FFDBFA] border-2 shadow-sm w-[273px] p-5 rounded-md">
                  <img src={bitcoindown} alt="" />
                  <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                    0
                  </h1>
                  <p className="text-[#6E6E6E]">Total Revenue For The Month</p>
                </div>
              </div>
            </div>

            {emptyState && (
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
            )}
            <div className="px-24 mt-6 w-full flex justify-between">
              <div className="flex  gap-1 items-center">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setTabs(
                        tabs.map((t) => ({ ...t, active: t.id === tab.id }))
                      );
                    }}
                    className={`${
                      tab.active
                        ? "bg-[#004324] text-[#ffffff] p-2 rounded-md"
                        : "bg-[#ffffff] text-[#004324] p-2 rounded-md"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
              {tabs.find((tab) => tab.active)?.name === "Expenses" && (
                <button
                  onClick={() => setOpen(true)}
                  className="bg-[#004324] text-[#ffffff] p-2 rounded-md flex items-center gap-2"
                >
                  <img src="/plus.svg" alt="" />
                  Add Expense
                </button>
              )}
              <ExpenseForm
                open={open}
                onClose={() => setOpen(false)}
                setDisplaySuccessModal={setDisplaySuccessModal}
              />
            </div>
            <div>
              {displaySuccessModal && (
                <div className="fixed top-0 z-[100000] left-0 w-full h-full bg-black/30 flex justify-center items-center">
                  <div className="bg-white flex flex-col items-center  p-4 rounded-md">
                    <h1 className="text-[16px] font-bold">
                      Expense Added Successfully
                    </h1>
                    <img
                      src="/src/assets/tick-double-03.png"
                      className=" mt-4 size-10 object-cover"
                      alt=""
                    />
                  </div>
                </div>
              )}
              {tabs.find((tab) => tab.active)?.name === "Finance" && (
                <div className={`${isCollapsed? ' max-w-[1000px]':' max-w-[850px]'} mt-4 mx-auto text-3xl font-bold`}>
                  {" "}
                  Coming Soon...{" "}
                </div>
                // <FinancialTable />
              )}
              {tabs.find((tab) => tab.active)?.name === "Expenses" && (
                <ExpensesTable />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialManagement;
