/* eslint-disable no-unused-vars */

import { userlist, usergroup, usercheck, userblock } from "../assets";
import CustomerTable from "../Components/Customers/CustomerTable";
import AddCustomer1 from "../Components/PopupModals/AddCustomer1";
import {
  useFetchStoreCustomers,
  useFetchUser,
} from "../datahooks/users/userhooks";
import CustomAwaitCard from "../Components/uicomps/customawaitcard";
import Navbar from "../Components/Navbar/Navbar";
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import DashboardBox from "@/Components/Dashboard/DashboardBox";
const Customer = () => {
  //show user profile image
  const { user } = useFetchUser();
  const {
    customers,
    isFetchingCustomers: isLoading,
    isError: error,
  } = useFetchStoreCustomers();
  const { isCollapsed} = useSidebarStore();

  return (
    <>
      <div className="min-h-screen pb-20">
        <div className="flex">
          {/* Sidebar */}
          {/* Navbar */}
          <div className={isCollapsed? 'flex-grow lg:ml-20 overflow-x-hidden':"flex-grow lg:ml-56 overflow-x-hidden"}>
            <Navbar
              title="Customers Management"
              icon={userlist}
              profilePic={user && user.image ? user.image : ""}
            />

            {/* Cards */}
            <div className={`${isCollapsed?'max-w-[1000px]':'max-w-[800px]'} mt-28 mb-6 mx-auto`}>
              <CustomAwaitCard isLoading={isLoading} error={error}>
                <div className="flex gap-20">
                  <DashboardBox text='Total Customers' imgWidth='w-9'  bgColor='bg-[#FCDADF]' image={ usergroup} data={customers?.length}  width='w-[50%]' />
                  <DashboardBox bgColor='bg-[#FFE8DF]' text='Active Customers' imgWidth='w-9' image={usercheck} data={customers?.length} width='w-[50%]'  />
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
            <div className={`flex ${isCollapsed?'max-w-[1000px]':'max-w-[800px]'}   mx-auto items-center`}>
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
                isCollapsed={isCollapsed}    
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
