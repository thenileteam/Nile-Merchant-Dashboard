/* eslint-disable react/prop-types */
import { useState } from "react";
import { preference1 } from "../../assets";
import CustomAwaitTable from "../uicomps/customawaittable"
import Pagination from '../Pagination/Pagination'
import usePagination from "../Pagination/PaginationHook";
// import AddCustomer from "../PopupModals/AddCustomer";

const CustomerTable = ({ customers, isLoading, error, isCollapsed }) => {
  // console.log(customers);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const itemsPerPage = 10
  const{pageCount, handlePageChange, currentItems}= usePagination()
  const toggleFilterDropdown = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const getTotalAmountSpent = (order) => {
    return order.reduce((acc, current) => acc + current.totalAmount, 0);
  };

  const handleFilterClick = (text) => {
    // Close the dropdown and show the popup with the selected text
    setFilterDropdownOpen(false);
    setSelectedText(text);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setSelectedText("");
  };
  return (
    <>
      {/* Filter Dropdown Section */}
      <div className="flex items-center justify-end px-24 relative">
        <h1 className="text-[#333333] font-bold text-[16px]">Filter By :</h1>
        <button
          onClick={toggleFilterDropdown}
          className="flex items-center focus:outline-none"
        >
          <img src={preference1} alt="Filter" className="cursor-pointer" />
        </button>

        {filterDropdownOpen && (
          <div
            className="absolute right-10 mt-2 w-[230px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none p-5"
            style={{ top: "100%" }}
          >
            <div
              className="py-1 space-y-3"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <h1
                className="text-[#6E6E6E] font-bold text-[16px] border-[#6E6E6E] border-2 p-2 rounded-lg cursor-pointer"
                onClick={() => handleFilterClick("Input Customer Name")}
              >
                Customer Name
              </h1>
              <h1
                className="text-[#6E6E6E] font-bold text-[16px] border-[#6E6E6E] border-2 p-2 rounded-lg cursor-pointer"
                onClick={() => handleFilterClick("Input Customer ID")}
              >
                Customer ID
              </h1>
              <h1
                className="text-[#6E6E6E] font-bold text-[16px] border-[#6E6E6E] border-2 p-2 rounded-lg cursor-pointer"
                onClick={() => handleFilterClick("Input Number")}
              >
                Total Orders
              </h1>
              <h1
                className="text-[#6E6E6E] font-bold text-[16px] border-[#6E6E6E] border-2 p-2 rounded-lg cursor-pointer"
                onClick={() => handleFilterClick("Input Amount")}
              >
                Total Spend
              </h1>
              <h1
                className="text-[#6E6E6E] font-bold text-[16px] border-[#6E6E6E] border-2 p-2 rounded-lg cursor-pointer"
                onClick={() => handleFilterClick("DD/MM/YYR")}
              >
                Last Purchase Date
              </h1>
            </div>
          </div>
        )}
      </div>

      {/* Popup Component */}
      {popupVisible && (
        <div className="absolute right-10 w-[230px] p-4 bg-white shadow-lg rounded-md">
          <input
            type="text"
            placeholder={selectedText}
            className="mt-2 p-2 border rounded-md w-full"
          />
          <button
            onClick={closePopup}
            className="mt-4 text-white bg-[#004324] p-2 font-bold px-5 rounded-md justify-center mx-auto flex"
          >
            Enter
          </button>
        </div>
      )}

      {/* Tables */}
      <div className={`${isCollapsed?'max-w-[1000px]':"max-w-[800px]"} mx-auto`}>
        <CustomAwaitTable isLoading={isLoading} error={error}>
        {customers?.length>0 &&  <table className=" w-full border-separate border-spacing-y-5">
            <thead>
              <tr className="text-left bg-[#EAF4E2] shadow-lg">
                <th className="p-2  text-center">Customer ID</th>
                <th className="p-2  text-center">Customer Name</th>
                <th className="p-2  text-center">Email</th>
                <th className="p-2  text-center">Total Orders</th>
                <th className="p-2 text-center">Total Spend</th>
                <th className="p-2   text-center">Last Purchase Date</th>
                {/* <th className="px-2 py-3 text-center">Actions</th>
                <th className="px-2 py-3 text-center">
                  Bulk Action
                  <p className="text-center text-[#8ED06C]">Send Discount</p>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {/* Row 1 */}
              {customers &&
                customers?.map((customer) => (
                  <tr key={customer.id} className="bg-[#ffffff] shadow-md">
                    <td className="p-2  text-center">
                      {customer.id.slice(0, 3)}
                    </td>
                    <td className="p-2 text-center">
                      {customer.name}
                    </td>
                    <td className="p-2  text-center">
                      {customer.email}
                    </td>
                    <td className="p-2 text-center">
                      {customer.order?.length || 0}
                    </td>
                    <td className="p-2 text-center">
                      &#8358;{getTotalAmountSpent(customer.order)}
                    </td>
                    <td className="p-2 text-center">
                      {customer.updatedAt.slice(0, 10)}
                    </td>
                    {/* <SendDiscount />
                    <td className="px-2 py-3 text-center">
                      <input
                        type="checkbox"
                        id="MarketingAccept"
                        name="marketing_accept"
                        className="size-5 rounded-md bg-white shadow-sm"
                      />
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>}
        </CustomAwaitTable>
      </div>
      {/*Pagination*/}
       {customers?.length>itemsPerPage&&<Pagination pageCount={pageCount} onPageChange={handlePageChange}/>}
    </>
  );
};

export default CustomerTable;
