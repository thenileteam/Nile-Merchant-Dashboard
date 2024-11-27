import React, { useState } from "react";
import { download, preference1 } from "../../assets";
import ReviewText from "../PopupModals/ReviewText";
import Respond from "../PopupModals/Respond";
import Publish from "../PopupModals/Publish";

const ReviewTable = () => {
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
                onClick={() => handleFilterClick("Input Review ID")}
              >
                Review ID
              </h1>
              <h1
                className="text-[#6E6E6E] font-bold text-[16px] border-[#6E6E6E] border-2 p-2 rounded-lg cursor-pointer"
                onClick={() => handleFilterClick("Input Ratings")}
              >
                Ratings
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
              <th className="px-2 py-3 text-center">Review ID</th>
              <th className="px-2 py-3 text-center">Customer Name</th>
              <th className="px-2 py-3 text-center">Ratings</th>
              <th className="px-2 py-3 text-center">Review Text</th>
              <th className="px-2 py-3 text-center">Date</th>
              <th className="px-2 py-3 text-center">Actions</th>
              <th className="px-2 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr className="bg-[#ffffff] shadow-md">
              <td className="px-2 py-3 text-center">5321</td>
              <td className="px-2 py-3 text-center">Jacob</td>
              <td className="px-2 py-3 text-center">4.5/5</td>
              <ReviewText />
              <td className="px-2 py-3 text-center">12/09/2024</td>
              <Respond />
              <Publish />
            </tr>

            {/* Row 2 */}
            <tr className="bg-[#ffffff] shadow-md">
              <td className="px-2 py-3 text-center">5321</td>
              <td className="px-2 py-3 text-center">Sammy</td>
              <td className="px-2 py-3 text-center">1.83/5</td>
              <ReviewText />
              <td className="px-2 py-3 text-center">05/09/2024</td>
              <Respond />
              <Publish />
            </tr>

            {/* Row 3 */}
            <tr className="bg-[#ffffff] shadow-md">
              <td className="px-2 py-3 text-center">5321</td>
              <td className="px-2 py-3 text-center">Sammy</td>
              <td className="px-2 py-3 text-center">1.83/5</td>
              <ReviewText />
              <td className="px-2 py-3 text-center">05/09/2024</td>
              <Respond />
              <Publish />
            </tr>

            {/* Row 4 */}
            <tr className="bg-[#ffffff] shadow-md">
              <td className="px-2 py-3 text-center">5321</td>
              <td className="px-2 py-3 text-center">Sammy</td>
              <td className="px-2 py-3 text-center">1.83/5</td>
              <ReviewText />
              <td className="px-2 py-3 text-center">05/09/2024</td>
              <Respond />
              <Publish />
            </tr>

            {/* Row 5 */}
            <tr className="bg-[#ffffff] shadow-md">
              <td className="px-2 py-3 text-center">5321</td>
              <td className="px-2 py-3 text-center">Darah</td>
              <td className="px-2 py-3 text-center">3/5</td>
              <ReviewText />
              <td className="px-2 py-3 text-center">29/08/2024</td>
              <Respond />
              <Publish />
            </tr>

            {/* Row 6 */}
            <tr className="bg-[#ffffff] shadow-md">
              <td className="px-2 py-3 text-center">5321</td>
              <td className="px-2 py-3 text-center">Darah</td>
              <td className="px-2 py-3 text-center">3/5</td>
              <ReviewText />
              <td className="px-2 py-3 text-center">29/08/2024</td>
              <Respond />
              <Publish />
            </tr>

            {/* Row 7 */}
            <tr className="bg-[#ffffff] shadow-md">
              <td className="px-2 py-3 text-center">5321</td>
              <td className="px-2 py-3 text-center">Darah</td>
              <td className="px-2 py-3 text-center">3/5</td>
              <ReviewText />
              <td className="px-2 py-3 text-center">29/08/2024</td>
              <Respond />
              <Publish />
            </tr>

            {/* Row 8 */}
            <tr className="bg-[#ffffff] shadow-md">
              <td className="px-2 py-3 text-center">5321</td>
              <td className="px-2 py-3 text-center">Darah</td>
              <td className="px-2 py-3 text-center">3/5</td>
              <ReviewText />
              <td className="px-2 py-3 text-center">29/08/2024</td>
              <Respond />
              <Publish />
            </tr>
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
      <div className=" flex px-28 justify-end items-center mt-10 gap-24">
        <h1 className="text-[#ffffff] flex font-bold gap-1 items-center bg-[#004324] p-2.5 rounded-md">
          <img src={download} alt="" />
          Export CSV
        </h1>
      </div>
    </>
  );
};

export default ReviewTable;
