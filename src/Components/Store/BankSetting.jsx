import { useState } from "react";
import { addsquare, arrowleft, image, notification } from "../../assets";
import { Link } from "react-router-dom";
import SaveChanges from "../PopupModals/SaveChanges";
import Navbar from "../Navbar/Navbar";
import { useFetchUser } from "@/datahooks/users/userhooks";
import { useSidebarStore } from "@/ZustandStores/sidebarStore";
import Sidebar from "../Sidebar/Sidebar";
import { Sheet, SheetTrigger } from "../ui/sheet";
import AcccountNumberComp from "./AcccountNumberComp";
import useBankDetails from "@/datahooks/banks/usebankhook";
const BankSetting = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState("Select Bank or Search");
  const { user } = useFetchUser();
  const { isCollapsed} = useSidebarStore();
  const { dbBanks } = useBankDetails();

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle bank selection
  const handleBankSelection = (bankName) => {
    setSelectedBank(bankName);
    setIsDropdownOpen(false); // Close the dropdown after selecting
  };
  return (
    <div className="">
      <div className="flex">
        <Sidebar />

        {/* Navbar */}
        <div
          className={
            isCollapsed
              ? "flex-grow lg:ml-20 overflow-x-hidden"
              : "flex-grow lg:ml-56 overflow-x-hidden"
          }
>
          <Navbar
            title="Bank Details"
            profilePic={user && user.image ? user.image : ""}
          />
          {/* Cards */}
          <div
            className={`${
              isCollapsed ? "max-w-[1000px]" : "max-w-[800px]"
            } mt-28 mb-6 mx-auto`}
          >
            <div className="text-center">
              <h1 className="text-[#004324] text-[24px] font-bold">
                Input Your Bank Details
              </h1>
              <p className="text-[#6E6E6E]">
                The Bank Informations You Provide Below Will Be <br /> Sent Your
                Funds To So,Check It Properly And <br /> Confirm
              </p>
            </div>
            <div className="flex justify-center">
              <form action="#" className="space-y-5">
                <div>
                  <label
                    htmlFor="Name"
                    className="block text-[16px] font-bold text-[#333333]"
                  >
                    BankName
                  </label>

                  {/* Bank selection div that triggers the dropdown */}
                  <div
                    className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-3 rounded-md cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <h1 className="text-gray-500 font-bold">{selectedBank}</h1>
                    <div className="flex items-center">
                      <img src={addsquare} alt="Add Square" />
                    </div>
                  </div>

                  {/* Dropdown list */}
                  {isDropdownOpen && (
                    <div className="absolute w-[325px] mt-2 border border-[#8ED06C] bg-white rounded-md shadow-lg">
                      <ul className="p-2">
                        <li
                          className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleBankSelection("Bank 1")}
                        >
                          Bank 1
                        </li>
                        <li
                          className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleBankSelection("Bank 2")}
                        >
                          Bank 2
                        </li>
                        <li
                          className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleBankSelection("Bank 3")}
                        >
                          Bank 3
                        </li>
                        <li
                          className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleBankSelection("Bank 4")}
                        >
                          Bank 4
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                {/* Input Field */}
                <div>
                  <label
                    htmlFor="AccountName"
                    className="block text-[16px] font-bold text-[#333333]"
                  >
                    Account Holders Name
                  </label>

                  <input
                    type="text"
                    id="AccountName"
                    name="account_name"
                    placeholder="James Jacob"
                    className="mt-1 w-[325px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="AccountNumber"
                    className="block text-[16px] font-bold text-[#333333]"
                  >
                    Account Number
                  </label>

                  <input
                    type="text"
                    id="AccountNumber"
                    name="account_number"
                    placeholder="0000000000000"
                    className="mt-1 w-[325px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                {/* Checkbox Option */}
                <div className="space-y-3">
                  <h1 className="text-[#333333] text-[16px] font-bold">
                    Select Payout Schedule
                  </h1>
                  <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                    <h1 className="text-gray-500 font-bold">Weekly</h1>
                    <div className="flex items-center">
                      &#8203;
                      <input
                        type="checkbox"
                        className="size-4 rounded border-gray-300"
                        id="Option2"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                    <h1 className="text-gray-500 font-bold">Monthly</h1>
                    <div className="flex items-center">
                      &#8203;
                      <input
                        type="checkbox"
                        className="size-4 rounded border-gray-300"
                        id="Option2"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center gap-16 mt-10">
              <SaveChanges />
            </div>
          </div>
        </div>
      </div>

      {/* Card section */}
    </div>
  );
};

export default BankSetting;
