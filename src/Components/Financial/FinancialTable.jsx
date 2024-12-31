/* eslint-disable no-unused-vars */
import { useState } from "react";
import { download, preference1 } from "../../assets";
import DownloadInvoice from "../PopupModals/DownloadInvoice";
// import RequestPayout from "../PopupModals/RequestPayout";
import { useFetchTransactions } from "@/datahooks/users/transactions";
import { UserTableListLoader } from "../CustomLoaders/loaders";

const FinancialTable = () => {
  const { transactions, isFetching, isError } = useFetchTransactions();
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  console.log(transactions);
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
      {/* Filter section dropdown */}
      {/* <div className="flex items-center justify-end px-24 mt-10 relative">
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
                onClick={() => handleFilterClick("Input ID")}
              >
                Transaction ID
              </h1>
              <h1
                className="text-[#6E6E6E] font-bold text-[16px] border-[#6E6E6E] border-2 p-2 rounded-lg cursor-pointer"
                onClick={() => handleFilterClick("Input Type")}
              >
                Type
              </h1>
              <h1
                className="text-[#6E6E6E] font-bold text-[16px] border-[#6E6E6E] border-2 p-2 rounded-lg cursor-pointer"
                onClick={() => handleFilterClick("Input Amount")}
              >
                Amount
              </h1>
              <h1
                className="text-[#6E6E6E] font-bold text-[16px] border-[#6E6E6E] border-2 p-2 rounded-lg cursor-pointer"
                onClick={() => handleFilterClick("DD/MM/YYR")}
              >
                Transaction Date
              </h1>
            </div>
          </div>
        )}
      </div> */}

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

      {/* Table */}
      <div className="px-24 w-full ">
        <UserTableListLoader
          data={transactions}
          loading={isFetching}
          error={isError}
          cols={4}
        >
          <table className=" w-full  border-separate border-spacing-y-5">
            <thead>
              <tr className="text-left bg-[#EAF4E2] shadow-lg">
                <th className="px-2 py-3 text-center">Transaction ID</th>
                <th className="px-2 py-3 text-center">Type</th>
                <th className="px-2 py-3 text-center">Amount</th>
                <th className="px-2 py-3 text-center">Transaction Date</th>
                <th className="px-2 py-3 text-center">Actions</th>
                <th className="px-2 py-3 text-center">
                  Bulk Action
                  <p className="text-center text-[#8ED06C]">Download Invoice</p>
                </th>
              </tr>
            </thead>

            <tbody className="w-full ">
              {/* Row 1 */}
              {transactions?.map((transaction, index) => (
                <tr key={index} className="bg-[#ffffff] shadow-md">
                  <td className="px-2 py-3 text-center">
                    {transaction?.id.slice(0, 6)}
                  </td>
                  <td className="px-2 py-3 text-center">{transaction?.type}</td>
                  <td className="px-2 py-3 text-center">
                    ${transaction?.amount}
                  </td>
                  <td className="px-2 py-3 text-center">
                    {new Date(transaction?.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-2 py-3 text-center text-[#8ED06C]">
                    <DownloadInvoice />
                  </td>
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
            </tbody>
          </table>
        </UserTableListLoader>
      </div>

      {/*Pagination*/}
      <div>
         </div>

      {/* Request Payout & Export CSV Button */}
      {/* <div className=" flex px-28 justify-end items-center mt-10 gap-20">
        <RequestPayout />

        <h1 className="text-[#ffffff] flex font-bold gap-1 items-center bg-[#004324] p-2.5 rounded-md">
          <img src={download} alt="" />
          Export CSV
        </h1>
      </div> */}
    </>
  );
};

export default FinancialTable;
