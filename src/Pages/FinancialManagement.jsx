/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Links from "../Links";
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
import PlaceholderImage from "../Components/PlaceholderImage/PlaceholderImage";
import ExpensesTable from "../Components/Financial/ExpensesTable";
import { ExpenseForm } from "@/Components/Financial/ExpenseForm";
import { useExpenseHook } from "@/datahooks/users/expensehook";
import { validateForm } from "@/utils/formatdate";
const FinancialManagement = () => {
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  let emptyState = false;
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
            className={`fixed top-0 left-0 h-full w-[290px] z-20 bg-[#004324] border-2 text-white p-5 transition-transform transform ${
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
            <nav className="bg-[#EAF4E2] p-4 shadow-md flex z-10 items-center gap-5 fixed w-full">
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
                  <img src={bitcoingraph} alt="" />
                  <h1 className="text-[32px] font-bold">
                    Financial Management
                  </h1>
                </div>
                <div className="flex items-center gap-10 ml-[10px]">
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
                      <PlaceholderImage />
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

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
                <div className=" p-[48px]  text-3xl font-bold"> Coming Soon </div>
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
