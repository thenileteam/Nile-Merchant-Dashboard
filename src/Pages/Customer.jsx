import { useState } from "react";
import { userlist, usergroup, usercheck, userblock } from "../assets";
import CustomerTable from "../Components/Customers/CustomerTable";
import AddCustomer1 from "../Components/PopupModals/AddCustomer1";
import {
  useFetchStoreCustomers,
  useFetchUser,
} from "../datahooks/users/userhooks";
import CustomAwaitCard from "../Components/uicomps/customawaitcard";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import { useUserStore } from "../zustandStore";
const Customer = () => {
  //show user profile image
  const { user } = useFetchUser();
  const {
    customers,
    isFetchingCustomers: isLoading,
    isError: error,
  } = useFetchStoreCustomers();
  const {sidebarOpen, setSidebarOpen, closeSidebar} = useUserStore();

  return (
    <>
      <div className="bg-[#F5F5F5] pb-20">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
          {/* Navbar */}
          <div className="flex-grow lg:ml-56 overflow-x-hidden">
            <Navbar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              title="Customers Management"
              icon={userlist}
              profilePic={user && user.image ? user.image : ""}
            />

            {/* Cards */}
            <div className="mt-28 mb-6 max-w-[800px] mx-auto">
              <CustomAwaitCard isLoading={isLoading} error={error}>
                <div className="flex gap-20">
                  <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                    <img src={usergroup} alt="" />
                    <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                      {customers?.length}
                    </h1>
                    <p className="text-[#6E6E6E]">Total Customers</p>
                  </div>
                  <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                    <img src={usercheck} alt="" />
                    <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                      {customers?.length}
                    </h1>
                    <p className="text-[#6E6E6E]">Active Customers</p>
                  </div>
                  {/*<div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                    <img src={userarrow} alt="" />
                    <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                      0
                    </h1>
                    <p className="text-[#6E6E6E]">Repeat Customers</p>
                  </div>*/}
                </div>
              </CustomAwaitCard>
            </div>
            {/* Add Customer & Export CSV Button */}
            <div className=" flex max-w-[800px]  mx-auto items-center">
              <AddCustomer1 transparent={true} />

              {/* <h1 className="text-[#ffffff] flex font-bold gap-1 items-center bg-[#004324] p-2.5 rounded-md">
          <img src={download} alt="" />
          Export CSV
        </h1> */}
            </div>
            {customers?.length === 0 && (
              <div className="px-24 mt-20">
                <div>
                  <img
                    src={userblock}
                    alt=""
                    className="flex justify-center mx-auto"
                  />
                  <h1 className="text-[24px] font-extrabold text-center">
                    You Have No Customers
                  </h1>
                  <p className="text-[#6E6E6E] font-bold text-center">
                    Once a customer buy from you or you <br /> added a customer
                    manually,they will <br /> appear here.
                  </p>
                </div>
                <div className="flex justify-center mt-3">
                  <AddCustomer1 transparent={false} />
                </div>
              </div>
            )}

            <div>
              <CustomerTable
                customers={customers}
                error={error}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
