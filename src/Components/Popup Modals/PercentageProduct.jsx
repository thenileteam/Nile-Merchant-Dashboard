import React, { useState } from "react";
import { addsquare, reload } from "../../assets";

const PercentageProduct = ({ isVisible, onClose }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [customerID, setCustomerID] = useState("");

  // Function to generate a random code
  const generateCustomerID = () => {
    const code = `DIS-${Math.floor(100000 + Math.random() * 900000)}`;
    setCustomerID(code);
  };

  const handleSendDiscount = () => {
    onClose(); // Close initial popup
    setTimeout(() => {
      setShowConfirmation(true); // Show confirmation popup
      setTimeout(() => setShowConfirmation(false), 700); // Auto-hide after 2 seconds
    }, 200); // Delay to allow initial popup to close first
  };

  if (!isVisible && !showConfirmation) return null; // Only render if initial popup or confirmation is visible
  return (
    <div>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Popup Content */}
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full h-[760px]">
            <div className="space-y-3 -mt-4">
              <label
                htmlFor=""
                className="block text-[16px] text-[#333333] font-bold"
              >
                {" "}
                Percentage %{" "}
              </label>
              <input
                type="text"
                id=""
                placeholder="Enter the %"
                className="mt-1 w-full rounded-md border-[#EAF4E2] border-2 shadow-sm sm:text-sm p-3"
              />
              <div className="flex items-center gap-2">
                <div>
                  <label
                    htmlFor=""
                    className="block text-[16px] text-[#333333] font-bold"
                  >
                    {" "}
                    Valid From{" "}
                  </label>
                  <input
                    type="text"
                    id=""
                    placeholder="Enter Start Date"
                    className="mt-1 w-full rounded-md border-[#EAF4E2] border-2 shadow-sm sm:text-sm p-3"
                  />
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="block text-[16px] text-[#333333] font-bold"
                  >
                    {" "}
                    Valid To{" "}
                  </label>
                  <input
                    type="text"
                    id=""
                    placeholder="Enter End Date"
                    className="mt-1 w-full rounded-md border-[#EAF4E2] border-2 shadow-sm sm:text-sm p-3"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <label
                    htmlFor=""
                    className="block text-[16px] font-bold text-[#333333]"
                  >
                    Applies To
                  </label>
                  <select
                    name=""
                    id=""
                    className="w-[190px] rounded-lg border-[#EAF4E2] border-2 py-2.5 pe-10 text-gray-700 sm:text-sm p-3 appearance-none cursor-pointer"
                  >
                    <option value="">Discount Applies To</option>
                    <option value="JM">All Product</option>
                    <option value="SRV">Shoes</option>
                    <option value="JH">Apparels</option>
                  </select>
                  <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none mt-7">
                    <img src={addsquare} alt="" />
                  </span>
                </div>
                <div className="relative">
                  <label
                    htmlFor=""
                    className="block text-[15px] font-bold text-[#333333]"
                  >
                    {" "}
                    Generate Discount Code{" "}
                  </label>
                  <input
                    type="text"
                    id=""
                    placeholder="Generate Code"
                    className="w-full rounded-md border-[#EAF4E2] border-2 py-2.5 pe-10 shadow-sm sm:text-sm p-3"
                    value={customerID}
                    readOnly
                  />
                  <span className="absolute inset-y-0 end-0 grid w-10 place-content-center mt-6">
                    <button
                      type="button"
                      onClick={generateCustomerID}
                      className="text-gray-600 hover:text-gray-700"
                    >
                      <img src={reload} alt="" />
                    </button>
                  </span>
                </div>
              </div>
              <form action="#" className="space-y-3 rounded-lg">
                <div>
                  <h1 className="block text-[16px] font-bold text-[#333333]">
                    Minimum Purchase Requirement
                  </h1>
                </div>
                <div className="flex items-center justify-between bg-[#ffffff] border-[#6E6E6E] border-2 p-2 rounded-md">
                  <h1 className="text-gray-500 font-bold">Minimum Purchase</h1>
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-300"
                      id="Option2"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between bg-[#ffffff] border-[#6E6E6E] border-2 p-2 rounded-md">
                  <h1 className="text-gray-500 font-bold">Minimum Quantity</h1>
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-300"
                      id="Option2"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between bg-[#ffffff] border-[#6E6E6E] border-2 p-2 rounded-md">
                  <h1 className="text-gray-500 font-bold">No Minimum</h1>
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-300"
                      id="Option2"
                    />
                  </div>
                </div>
              </form>
              <form action="#" className="space-y-3 rounded-lg">
                <div>
                  <h1 className="block text-[16px] font-bold text-[#333333]">
                    Maximum Purchase Requirement
                  </h1>
                </div>
                <div className="flex items-center justify-between bg-[#ffffff] border-[#6E6E6E] border-2 p-2 rounded-md">
                  <h1 className="text-gray-500 font-bold">Maximum Purchase</h1>
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-300"
                      id="Option2"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between bg-[#ffffff] border-[#6E6E6E] border-2 p-2 rounded-md">
                  <h1 className="text-gray-500 font-bold">Maximum Quantity</h1>
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-300"
                      id="Option2"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between bg-[#ffffff] border-[#6E6E6E] border-2 p-2 rounded-md">
                  <h1 className="text-gray-500 font-bold">No Maximum</h1>
                  <div className="flex items-center">
                    &#8203;
                    <input
                      type="checkbox"
                      className="size-4 rounded border-gray-300"
                      id="Option2"
                    />
                  </div>
                </div>
              </form>
            </div>
            <button
              onClick={handleSendDiscount}
              className="mt-4 px-4 py-2 bg-[#004324] text-white rounded flex justify-center mx-auto"
            >
              Send Discount
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded shadow-lg text-center">
            <p className="text-[16px] font-bold text-[#333333]">
              Discount Code Sent To The Customer’s <br />
              E-Mail/Phone Number
            </p>
            <div className="flex justify-center mt-5">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2089 30.1527C11.6633 30.6105 11.1909 30.8375 10.6989 30.8327C9.56533 30.8212 8.62105 29.6617 6.7325 27.3429L4.20755 24.2424C3.16773 22.9657 3.04051 21.0647 3.89891 19.6302C4.87945 17.9917 6.75993 17.5327 8.22548 18.3549M18.2024 14.166C19.5209 12.7758 20.9279 11.3864 22.4625 9.97734C23.2029 9.29757 24.1257 9.0568 24.9987 9.2107"
                  stroke="#004324"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M23.5108 27.1843C27.2773 22.8187 30.9133 19.857 35.4806 15.663C36.8476 14.4076 37.0588 12.2072 35.9863 10.6482C34.8466 8.9913 32.6808 8.66013 31.215 9.97733C27.0313 13.7366 23.7765 17.3562 20.689 21.225C20.527 21.428 20.446 21.5295 20.3618 21.5867C20.1486 21.7315 19.8821 21.7332 19.6676 21.5907C19.583 21.5345 19.5018 21.4348 19.3395 21.2358L17.6943 19.2178C16.1931 17.3765 13.5006 17.5803 12.2472 19.6302C11.3701 21.0647 11.5001 22.9657 12.5626 24.2423L15.1425 27.3428C17.0721 29.6617 18.037 30.8212 19.1953 30.8327C20.3536 30.844 21.406 29.624 23.5108 27.1843Z"
                  stroke="#004324"
                  stroke-width="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PercentageProduct;
