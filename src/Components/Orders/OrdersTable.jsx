/* eslint-disable react/prop-types */
import { useState } from "react";
import { download, preference1 } from "../../assets";
// import ShippingConfirm from "../Popup Modals/ShippingConfirm";
import { format, parseISO } from "date-fns";

const OrdersTable = ({ data }) => {
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  const toggleFilterDropdown = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
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
      <div className="flex items-center justify-end px-24 mt-10 relative">
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
                onClick={() => handleFilterClick("Input Order ID")}
              >
                Order ID
              </h1>
              <h1
                className="text-[#6E6E6E] font-bold text-[16px] border-[#6E6E6E] border-2 p-2 rounded-lg cursor-pointer"
                onClick={() => handleFilterClick("Input Store Name")}
              >
                Store Name
              </h1>
              <h1
                className="text-[#6E6E6E] font-bold text-[16px] border-[#6E6E6E] border-2 p-2 rounded-lg cursor-pointer"
                onClick={() => handleFilterClick("Input Product Name")}
              >
                Product Name
              </h1>
              <h1
                className="text-[#6E6E6E] font-bold text-[16px] border-[#6E6E6E] border-2 p-2 rounded-lg cursor-pointer"
                onClick={() => handleFilterClick("DD/MM/YYR")}
              >
                Date
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
      <div className="px-24">
        <table className=" w-full border-separate border-spacing-y-5">
          <thead>
            <tr className="text-left bg-[#EAF4E2] shadow-lg">
              <th className="px-2 py-3">Customer Name</th>
              <th className="px-2 py-3 text-center">Order ID</th>
              <th className="px-2 py-3 text-center">Product Name</th>
              <th className="px-2 py-3 text-center">Price</th>
              <th className="px-2 py-3 text-center">Total P. With Shipping</th>
              <th className="px-2 py-3 text-center">Order Date</th>
              <th className="px-2 py-3 text-center">Shipping Status</th>
              <th className="px-2 py-3 text-center">Track Order</th>
              <th className="px-2 py-3 text-center">Payment Status</th>
              <th className="px-2 py-3 text-center">Actions</th>
              <th className="px-2 py-3 text-center">
                Bulk Action
                <svg
                  width="24"
                  className="flex justify-center mx-auto"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 9L9 14.9996M15 15L9 9.00039"
                    stroke="#8ED06C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                    stroke="#8ED06C"
                    strokeWidth="1.5"
                  />
                </svg>
                <h1 className="px-2 py-3 text-center text-[#8ED06C] flex items-center">
                  Mark As Shipped
                </h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((order) => (
              <tr key={order._id} className="bg-[#ffffff] shadow-md">
                <td className="px-2 py-3 bg-[#EAF4E2]">{order.customerId}</td>
                <td className="px-2 py-3 text-center">{order.id}</td>
                <td className="px-2 py-3 text-center">Lion&lsquo;s Den</td>
                <td className="px-2 py-3 text-center">57</td>
                <td className="px-2 py-3 text-center">${order.totalAmount}</td>
                <td className="px-2 py-3 text-center">
                  {format(parseISO(order?.createdAt), "dd MMMM yyyy")}
                </td>
                <td className="px-2 py-3 text-center">NA</td>
                <td className="px-2 py-3 text-center">Completed</td>
                <td className="px-2 py-3 text-center">
                  {order.payment || "Pending"}
                </td>
                <td className="px-2 py-3 text-center">{order.status}</td>
                <td className="px-2 py-3 text-center">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md bg-white shadow-sm"
                  />
                </td>
              </tr>
            ))}
            {/* Row 1 */}

            {/* Row 6 */}
            {/* <tr className="bg-[#ffffff] shadow-md">
              <td className="px-2 py-3 bg-[#EAF4E2]">Jaddy</td>
              <td className="px-2 py-3 text-center">5321</td>
              <td className="px-2 py-3 text-center">Lion's Den</td>
              <td className="px-2 py-3 text-center">57</td>
              <td className="px-2 py-3 text-center">$350</td>
              <td className="px-2 py-3 text-center">05/11/2024</td>
              <td className="px-2 py-3 text-center">Cancelled</td>
              <td className="px-2 py-3 text-center text-[#8ED06C]">Track</td>
              <td className="px-2 py-3 text-center">Pending</td>
              <td className="px-2 py-3 text-center">Cancelled</td>
              <td className="px-2 py-3 text-center">
                <input
                  type="checkbox"
                  id="MarketingAccept"
                  name="marketing_accept"
                  className="size-5 rounded-md bg-white shadow-sm"
                />
              </td>
            </tr>

            {/* Row 7 */}
            {/* <tr className="bg-[#ffffff] shadow-md">
              <td className="px-2 py-3 bg-[#EAF4E2]">Mary</td>
              <td className="px-2 py-3 text-center">5321</td>
              <td className="px-2 py-3 text-center">Lion's Den</td>
              <td className="px-2 py-3 text-center">57</td>
              <td className="px-2 py-3 text-center">$350</td>
              <td className="px-2 py-3 text-center">05/11/2024</td>
              <td className="px-2 py-3 text-center">Pending</td>
              <td className="px-2 py-3 text-center text-[#8ED06C]">Track</td>
              <td className="px-2 py-3 text-center">Pending</td>
              <ShippingConfirm />
              <td className="px-2 py-3 text-center">
                <input
                  type="checkbox"
                  id="MarketingAccept"
                  name="marketing_accept"
                  className="size-5 rounded-md bg-white shadow-sm"
                />
              </td>
            </tr> */}

            {/* Row 8 */}
            {/* <tr className="bg-[#ffffff] shadow-md">
              <td className="px-2 py-3 bg-[#EAF4E2]">Mary</td>
              <td className="px-2 py-3 text-center">5321</td>
              <td className="px-2 py-3 text-center">Lion's Den</td>
              <td className="px-2 py-3 text-center">57</td>
              <td className="px-2 py-3 text-center">$350</td>
              <td className="px-2 py-3 text-center">05/11/2024</td>
              <td className="px-2 py-3 text-center">Pending</td>
              <td className="px-2 py-3 text-center text-[#8ED06C]">Track</td>
              <td className="px-2 py-3 text-center">Pending</td>
              <ShippingConfirm />
              <td className="px-2 py-3 text-center">
                <input
                  type="checkbox"
                  id="MarketingAccept"
                  name="marketing_accept"
                  className="size-5 rounded-md bg-white shadow-sm"
                />
              </td>
            </tr> */}

            {/* Row 9 */}
            {/* <tr className="bg-[#ffffff] shadow-md">
              <td className="px-2 py-3 bg-[#EAF4E2]">Kelly</td>
              <td className="px-2 py-3 text-center">5321</td>
              <td className="px-2 py-3 text-center">Lion's Den</td>
              <td className="px-2 py-3 text-center">57</td>
              <td className="px-2 py-3 text-center">$350</td>
              <td className="px-2 py-3 text-center">05/11/2024</td>
              <td className="px-2 py-3 text-center">Pending</td>
              <td className="px-2 py-3 text-center text-[#8ED06C]">Track</td>
              <td className="px-2 py-3 text-center">Pending</td>
              <ShippingConfirm />
              <td className="px-2 py-3 text-center">
                <input
                  type="checkbox"
                  id="MarketingAccept"
                  name="marketing_accept"
                  className="size-5 rounded-md bg-white shadow-sm"
                />
              </td>
            </tr>  */}
          </tbody>
        </table>
      </div>

      {/*Pagination*/}
      <div>
        <ol className="flex justify-center gap-3 text-xs font-medium mt-3">
          <li>
            <a
              href="#"
              className="inline-flex size-8 items-center justify-center rounded border border-gray-300 bg-white hover:bg-[#8ED06C] text-gray-900 hover:text-[#E2E8F0] rtl:rotate-180"
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block size-8 rounded border border-[#8ED06C] bg-white text-center leading-8 text-[#8ED06C]"
            >
              1
            </a>
          </li>

          <li className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900">
            2
          </li>

          <li>
            <a
              href="#"
              className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900"
            >
              ...
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900"
            >
              9
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900"
            >
              10
            </a>
          </li>

          <li>
            <a
              href="#"
              className="inline-flex size-8 items-center justify-center rounded border border-gray-300 bg-white hover:bg-[#8ED06C] text-gray-900 hover:text-[#E2E8F0] rtl:rotate-180"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ol>
      </div>

      {/* Export CSV Button */}
      <div className=" flex px-28 justify-end mt-10">
        <h1 className="text-[#ffffff] flex font-bold gap-1 items-center bg-[#004324] p-2.5 rounded-md">
          <img src={download} alt="" />
          Export CSV
        </h1>
      </div>
    </>
  );
};

export default OrdersTable;
