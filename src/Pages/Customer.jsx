import { useState } from "react";
import { Link } from "react-router-dom";
import Links from "../Links";
import {
  image,
  nilelogowhite,
  notification,
  userlist,
  usergroup,
  usercheck,
  userarrow,
  userblock,
} from "../assets";
import CustomerTable from "../Components/Customers/CustomerTable";
import AddCustomer1 from "../Components/PopupModals/AddCustomer1";
import { useFetchStoreCustomers, useFetchUser } from "../datahooks/users/userhooks";
import CustomAwaitCard from "../Components/uicomps/customawaitcard";
import Navbar from "../Components/Navbar/Navbar";
const Customer = () => {
  //show user profile image
  const { user } = useFetchUser();
  const {
    customers,
    isFetchingCustomers: isLoading,
    isError: error,
  } = useFetchStoreCustomers();
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
            className={`fixed top-0 left-0 h-full w-[290px] z-20 bg-[#004324] border-2 text-white p-5 transition-transform transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0`}
          >
            <img
              src={nilelogowhite}
              alt="nile logo"
              className="w-[130px] flex mx-auto"
            />
            <Links />
          </div>

          {/* Navbar */}
          <div className="flex-grow lg:ml-64 overflow-x-hidden">
            < Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} title='Customers Management' icon={userlist} profilePic={user && user.image ? user.image : ""} /> 

            {/* Cards */}
            <div className="p-6 mt-28 px-32">
              <CustomAwaitCard isLoading={isLoading} error={error}>
                <div className="flex gap-28">
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
