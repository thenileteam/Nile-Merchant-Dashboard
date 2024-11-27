import React, { useState } from "react";
import { addsquare, reload } from "../../assets";
import PercentageProduct from "./PercentageProduct";
import FreeShipping from "./FreeShipping";

const SendDiscount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(
    "Choose Discount Type"
  );
  const [isPercentageModalOpen, setIsPercentageModalOpen] = useState(false);
  const [isFreeShippingModalOpen, setIsFreeShippingModalOpen] = useState(false);

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsPercentageModalOpen(false); // Ensure percentage modal is closed
    setIsFreeShippingModalOpen(false); // Ensure free shipping modal is closed
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDiscountSelection = (discount) => {
    setSelectedDiscount(discount);
    setIsDropdownOpen(false); // Close the dropdown

    if (discount === "Percentage Off Product") {
      setIsModalOpen(false); // Close the first modal
      setIsPercentageModalOpen(true); // Open the percentage modal
    } else if (discount === "Free Shipping") {
      setIsModalOpen(false); // Close the first modal
      setIsFreeShippingModalOpen(true); // Open the free shipping modal
    }
  };

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td
              className="px-2 py-3 text-center text-[#8ED06C] cursor-pointer"
              onClick={toggleModal}
            >
              Send Discount
            </td>
          </tr>
        </tbody>
      </table>

      {/* First Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-md h-[300px] w-full">
            <h2 className="text-xl font-semibold mb-4">Discount Type</h2>
            <div>
              {/* Discount type selection */}
              <div
                className="flex items-center justify-between bg-[#ffffff] border-[#EAF4E2] border-2 p-3 rounded-md cursor-pointer"
                onClick={toggleDropdown}
              >
                <h1 className="text-gray-500 font-bold">{selectedDiscount}</h1>
                <div className="flex items-center">
                  <img src={addsquare} alt="Add Square" />
                </div>
              </div>

              {/* Dropdown list */}
              {isDropdownOpen && (
                <div className="absolute w-[370px] mt-2 border border-[#EAF4E2] bg-white rounded-md shadow-lg">
                  <ul className="p-2 space-y-3">
                    <li
                      className="py-2 px-4 border-[#6E6E6E] border-2 rounded-md cursor-pointer text-[#6E6E6E] font-bold"
                      onClick={() =>
                        handleDiscountSelection("Percentage Off Product")
                      }
                    >
                      Percentage Off Product
                    </li>
                    <li
                      className="py-2 px-4 border-[#6E6E6E] border-2 rounded-md cursor-pointer text-[#6E6E6E] font-bold"
                      onClick={() => handleDiscountSelection("Free Shipping")}
                    >
                      Free Shipping
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <PercentageProduct
        isVisible={isPercentageModalOpen}
        onClose={() => setIsPercentageModalOpen(false)}
      />
      <FreeShipping
        isVisible={isFreeShippingModalOpen}
        onClose={() => setIsFreeShippingModalOpen(false)}
      />

    </div>
  );
};

export default SendDiscount;
