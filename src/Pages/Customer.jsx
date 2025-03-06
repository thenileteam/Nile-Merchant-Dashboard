/* eslint-disable no-unused-vars */

import { userlist, usergroup, usercheck, userblock } from "../assets";
import CustomerTable from "../Components/Customers/CustomerTable";
import AddCustomer1 from "../Components/PopupModals/AddCustomer1";
import { useFetchStoreCustomers } from "../datahooks/users/userhooks";
import CustomAwaitCard from "../Components/uicomps/customawaitcard";
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import DashboardBox from "@/Components/Dashboard/DashboardBox";
import DashboardIntro from "../Components/Dashboard/DashboardIntro";
import PageFilters from "@/Components/PageFilters/PageFilter";
import {useFilter} from "@/Components/PageFilters/usePageFilter";
import { isRecentCustomer } from "@/Components/PageFilters/usePageFilter";
const Customer = () => {
  //check for recent customers
  const customerFilterFunction = (customers, selectedFilter) => {
    if (selectedFilter === "Recent") {
      return customers.filter((customer) => isRecentCustomer(customer));
    }
    return customers;  
  };
  
  const {
    customers,
    isFetchingCustomers: isLoading,
    isError: error,
  } = useFetchStoreCustomers();
  const {
    selectedFilter,
    handleActiveFilterChange,
    handleSearch,
    filteredItems: filteredCustomers,
    noResults
  } = useFilter(customers, customerFilterFunction);
  const { isCollapsed } = useSidebarStore();
console.log(customers)
  return (
    <section>
      {customers?.length === 0 ? (
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
      ) : (
        <div className="min-h-screen mt-[73px]">
          <div
            className={`${
              isCollapsed
                ? "lg:ml-20 overflow-x-hidden"
                : "flex-grow lg:ml-56 overflow-x-hidden"
            }`}
          >
            {/* Cards */}
            <div
              className={`${
                isCollapsed ? "max-w-[1100px]" : "max-w-[950px]"
              } mb-6 mx-auto`}
            >
              <article className="flex flex-col lg:flex-row gap-3 lg:gap-0 justify-between lg:items-center ">
                <DashboardIntro introText={"Customer Management"} />
                <AddCustomer1 transparent={true} />
              </article>
              <CustomAwaitCard
                isLoading={isLoading}
                error={error}
                isCollapsed={isCollapsed}
              >
                <div className="flex gap-20 mt-10">
                  <DashboardBox
                    text="Total Customers"
                    spacing="my-5"
                    data={customers?.length}
                    width="w-[50%]"
                  />
                  <DashboardBox
                    text="Active Customers"
                    spacing="my-5"
                    data={customers?.length}
                    width="w-[50%]"
                  />
                  {/*<div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                    <img src={userarrow} alt="" />
                    <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                      0
                    </h1>
                    <p className="text-[#6E6E6E]">Repeat Customers</p>
                  </div>*/}
                </div>
              {/* filters */}
              <PageFilters
                filters={["All", "Recent"]}
                page="Customers"
                searchPlaceholder="Search Customer..."
                activeFilter={selectedFilter}
                onFilterChange={handleActiveFilterChange}
                handleSearch={handleSearch}
              />
              </CustomAwaitCard>
            </div>
              <div>
                {noResults ? (
                  <p className=" text-center my-auto">No Items Found</p>
                ) : (
                  <CustomerTable
                    customers={filteredCustomers}
                    error={error}
                    isLoading={isLoading}
                    isCollapsed={isCollapsed}
                  />)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Customer;
