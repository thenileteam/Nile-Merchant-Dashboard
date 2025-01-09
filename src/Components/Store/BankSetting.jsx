import { useState } from "react";
import { addsquare } from "../../assets";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useFetchUser } from "@/datahooks/users/userhooks";
import { useSidebarStore } from "@/ZustandStores/sidebarStore";
import useBankDetails from "@/datahooks/banks/usebankhook";

const BankSetting = () => {
  const { user } = useFetchUser();
  const { isCollapsed } = useSidebarStore();

  const {
    banks,
    formData,
    handleChange,
    resolvingAccount,
    banksLoading,
    banksError,
    isAdding,
    addBank,
  } = useBankDetails();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle Dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Handle Bank Selection
  const handleBankSelection = (bank) => {
    handleChange("bankCode", bank.code); // Update bankCode in the formData
    handleChange("bankName", bank.name); // Update bankName in the formData
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  // Handle form submission
  const handleSubmit = () => {
    if (formData.accountName) {
      addBank(formData); // Add bank details to the backend
    }
  };

  return (
    <div>
      <div className="flex">
        <Sidebar />
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
          <div className="max-w-[800px] mt-28 mb-6 mx-auto">
            <div className="text-center">
              <h1 className="text-[#004324] text-[24px] font-bold">
                Input Your Bank Details
              </h1>
              <p className="text-[#6E6E6E] my-3">
                The Bank Information You Provide Below Will Be <br />
                Used to Send Your Funds. Check It Properly and Confirm.
              </p>
            </div>
            <div className="flex justify-center">
              <form className="space-y-5">
                {/* Bank Selection */}
                <div>
                  <label
                    htmlFor="BankName"
                    className="block text-[16px] font-bold text-[#333333]"
                  >
                    Bank Name
                  </label>
                  <div
                    className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-3 rounded-md cursor-pointer"
                    onClick={toggleDropdown}
                  >
                    <h1 className="text-gray-500 font-bold">
                      {formData.bankName || "Select Bank or Search"}
                    </h1>
                    <img src={addsquare} alt="Add Square" />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute w-[325px] mt-2 border border-[#8ED06C] bg-white rounded-md shadow-lg max-h-[200px] overflow-y-auto">
                      {banksLoading ? (
                        <p className="p-2 text-gray-500">Loading Banks...</p>
                      ) : banksError ? (
                        <p className="p-2 text-red-500">Error loading banks</p>
                      ) : (
                        banks.map((bank) => (
                          <div
                            key={bank.code}
                            className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleBankSelection(bank)}
                          >
                            {bank.name}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Account Number */}
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
                    name="accountNumber"
                    maxLength={10}
                    value={formData.accountNumber}
                    onChange={(e) =>
                      handleChange("accountNumber", e.target.value)
                    }
                    placeholder="Enter Account Number"
                    className="mt-1 w-[325px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  />
                  {formData.accountNumber &&
                    formData.accountNumber.length < 10 && (
                      <p className="text-sm text-red-500 mt-1">
                        Account number must be 10 digits
                      </p>
                    )}
                </div>

                {/* Account Holder's Name */}
                <div>
                  <label
                    htmlFor="AccountName"
                    className="block text-[16px] font-bold text-[#333333]"
                  >
                    Account Holder's Name
                  </label>
                  <input
                    type="text"
                    id="AccountName"
                    name="accountName"
                    value={formData.accountName}
                    readOnly
                    placeholder={
                      resolvingAccount
                        ? "Resolving account name..." // Show while resolving
                        : "Account name will automatically appear here"
                    }
                    className={`mt-1 w-[325px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm ${
                      resolvingAccount ? "bg-gray-100" : ""
                    }`}
                  />
                </div>

                {/* Checkbox Option */}
                <div className="space-y-3">
                  <h1 className="text-[#333333] text-[16px] font-bold">
                    Select Payout Schedule
                  </h1>
                  <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                    <h1 className="text-gray-500 font-bold">Weekly</h1>
                    <input
                      type="radio"
                      className="size-4 rounded border-gray-300"
                      name='payout-schedule'
                    />
                  </div>
                  <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                    <h1 className="text-gray-500 font-bold">Monthly</h1>
                    <input
                      type="radio"
                      name='payout-schedule'
                      className="size-4 rounded border-gray-300"
                    />
                  </div>
                </div>
              </form>
            </div>
            <button
              onClick={handleSubmit}
              className={`w-[180px] h-[50px] rounded-md block mx-auto mt-4 bg-green text-white ${
                formData.accountName ? "" : "opacity-50"
              }`}
              disabled={isAdding || !formData.accountName}
            >
              {isAdding ? (
                <div className="flex items-center gap-2">
                  <span>Adding Bank Details...</span>
                </div>
              ) : (
                "Add Bank Details"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankSetting;
