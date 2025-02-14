/* eslint-disable react/prop-types */
import { useState } from "react";
import { preference1 } from "../../assets";
import CustomAwaitTable from "../uicomps/customawaittable";
import Pagination from "../Pagination/Pagination";
import usePagination from "../Pagination/PaginationHook";
// import AddCustomer from "../PopupModals/AddCustomer";

const CustomerTable = ({ customers, isLoading, error, isCollapsed }) => {
  // console.log(customers);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const itemsPerPage = 10;
  const { pageCount, handlePageChange, currentItems } = usePagination();
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
      {/* Tables */}
      <div
        className={`${
          isCollapsed ? "max-w-[1100px]" : "max-w-[950px]"
        } mx-auto rounded-md shadow-md p-4 bg-white text-lightBlack border-[0.5px]`}
      >
        <CustomAwaitTable isLoading={isLoading} error={error}>
          {customers?.length > 0 && (
            <div className="overflow-x-scroll lg:overflow-auto">
              <table className=" w-full border-separate border-spacing-y-4">
                <thead>
                  <tr className="text-left bg-[#EAF4E2] shadow-lg">
                    <th className="p-3  text-center">Customer ID</th>
                    <th className="p-3  text-center">Customer Name</th>
                    <th className="p-3  text-center">Email</th>
                    <th className="p-3  text-center">Total Orders</th>
                    <th className="p-3 text-center">Total Spend</th>
                    <th className="p-3   text-center">Last Purchase Date</th>
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
                    customers?.map((customer) => {
                      // console.log(customer);
                      return (
                        <tr
                          key={customer.id}
                          className="bg-[#ffffff] shadow-md"
                        >
                          <td className="p-3  text-center bg-[#EAF4E2] font-bold">
                            {customer.id.slice(0, 3)}
                          </td>
                          <td className="p-3 text-center text-[#6e6e6e]">{customer.name}</td>
                          <td className="p-3  text-center text-[#6e6e6e]">{customer.email}</td>
                          <td className="p-3 text-center text-[#6e6e6e]">
                            {customer.order?.length || 0}
                          </td>
                          <td className="p-3 text-center text-[#6e6e6e]">
                            &#8358;{getTotalAmountSpent(customer.order)}
                          </td>
                          <td className="p-3 text-center text-[#6e6e6e]">
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
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}
        </CustomAwaitTable>
      </div>
      {/*Pagination*/}
      {customers?.length > itemsPerPage && (
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      )}
    </>
  );
};

export default CustomerTable;
