/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import { useFetchUser } from "@/datahooks/users/userhooks";
import Navbar from "@/Components/Navbar/Navbar";
import ExpensesTable from "../Components/Financial/ExpensesTable";
import { ExpenseForm } from "@/Components/Financial/ExpenseForm";
import { useExpenseHook } from "@/datahooks/users/expensehook";
import { validateForm } from "@/utils/formatdate";
import { useFetchTransactions } from "@/datahooks/users/transactions";
import { useFetchExpense } from "@/datahooks/users/expensehook";
import DashboardBox from "@/Components/Dashboard/DashboardBox";
import RequestPayout from "../Components/PopupModals/RequestPayout";
import DashboardIntro from "../Components/Dashboard/DashboardIntro";
const FinancialManagement = ({ data }) => {
  const { user } = useFetchUser();
  const { isCollapsed } = useSidebarStore();
  const [displaySuccessModal, setDisplaySuccessModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({
    expense: "false",
  });
  const { totalRevenue, totalRevenueForMonth } = useFetchTransactions();
  const { totalExpense } = useFetchExpense();
  console.log(totalExpense);

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

  const navigate = useNavigate();
  return (
    <>
      <div className="mt-[73px]">
        <div
          className={
            isCollapsed
              ? " lg:ml-20 overflow-x-hidden"
              : "lg:ml-56 overflow-x-hidden"
          }
        >
          {/* Cards */}
          <div
            className={`${
              isCollapsed ? "max-w-[1100px]" : "max-w-[950px]"
            } mx-auto`}
          >
            <article className="flex items-center justify-between">
              <DashboardIntro introText="Financial Management" />
              {searchParams.get("expense") === "true" ? (
                <button
                  onClick={() => setOpen(true)}
                  className="bg-[#004324] text-[#ffffff] p-2 rounded-md flex items-center gap-2"
                >
                  <img src="/plus.svg" alt="" />
                  Add Expense
                </button>
              ) : (
                <RequestPayout />
              )}
            </article>
            <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 lg:gap-10">
              <DashboardBox
                text="Total Revenue"
                spacing="my-4"
                width="w-full"
                data={totalRevenue}
              />
              <DashboardBox
                text="Total Expenses"
                spacing="my-4"
                width="w-full"
                data={totalExpense}
              />
              <DashboardBox
                text="Total Revenue For The Month"
                spacing="my-4"
                width="w-full"
                data={totalRevenueForMonth}
              />

              {emptyState && (
                <div className="px-24 mt-32  ">
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
              <div className="mt-6 w-full flex justify-between ">
                <div className="flex gap-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setTabs(
                          tabs.map((t) => ({ ...t, active: t.id === tab.id }))
                        );
                        navigate(`?expense=${tab.id === 2 ? true : false}`);
                      }}
                      className={`${
                        searchParams.get("expense") ===
                        `${tab.id === 2 ? true : false}`
                          ? "bg-[#004324] text-[#ffffff] p-2 rounded-md"
                          : "bg-[#ffffff] text-[#004324] p-2 rounded-md"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </div>
                <ExpenseForm
                  open={open}
                  onClose={() => setOpen(false)}
                  setDisplaySuccessModal={setDisplaySuccessModal}
                />
              </div>
            </div>
            <div></div>
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
            {searchParams.get("expense") === "false" && <FinancialTable />}
            {searchParams.get("expense") === "true" && <ExpensesTable />}
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialManagement;
