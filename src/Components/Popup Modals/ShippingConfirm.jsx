import React, { useState } from "react";

const ShippingConfirm = () => {
  // State to control the main popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // State to control the final confirmation visibility
  const [isFinalConfirmationOpen, setIsFinalConfirmationOpen] = useState(false);

  // State to control whether the fade-out animation should play
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Function to toggle the main popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Function to handle the "Yes" button click
  const handleYesClick = () => {
    setIsPopupOpen(false); // Close the main popup
    setIsFinalConfirmationOpen(true); // Show the final confirmation popup

    // Automatically start the fade-out after a short delay
    setTimeout(() => {
      setIsFadingOut(true); // Trigger fade-out animation
    }, 2500); // Show the final confirmation for 2.5 seconds before fading out

    // Close the final confirmation popup after the fade-out completes (300ms)
    setTimeout(() => {
      setIsFinalConfirmationOpen(false); // Fully close the popup
      setIsFadingOut(false); // Reset fade state
    }, 500); // Total time = 2.5 seconds + 0.5 seconds for fade-out
  };
  return (
    <>
      {/* Button to trigger the popup */}
      <button onClick={togglePopup}>
        <td className="px-2 py-3 text-center text-[#8ED06C] flex items-center">
          Mark As Shipped
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 9L9 14.9996M15 15L9 9.00039"
              stroke="#8ED06C"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
              stroke="#8ED06C"
              stroke-width="1.5"
            />
          </svg>
        </td>
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <div>
              <h1 className="text-[16px] font-bold text-[#333333] text-center">
                Are You Sure It Has Been Shipped ?
              </h1>
            </div>

            <div className="flex items-center justify-center gap-28">
              {/* Yes Button */}
              <button onClick={handleYesClick} type="button">
                <div className=" flex mt-10">
                  <h1 className="text-[#333333] flex font-bold gap-1 items-center hover:border-[#ffffff] hover:bg-[#E2E8F0] transition ease-out duration-500 border-[#004324] border-2 p-2 px-6 rounded-md">
                    Yes
                  </h1>
                </div>
              </button>

              {/* Cancel Button */}
              <button onClick={togglePopup} type="button">
                <div className=" flex mt-10">
                  <h1 className="text-[#ffffff] hover:text-[#333333] transition ease-out duration-700 flex font-bold gap-1 items-center border-[#004324] hover:bg-[#E2E8F0] bg-[#004324] border-2 p-2 px-6 rounded-md">
                    No
                  </h1>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final Confirmation Modal with Fade-Out Animation */}
      {isFinalConfirmationOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 
          ${
            isFadingOut
              ? "opacity-0 transition-opacity duration-500"
              : "opacity-100 transition-opacity duration-500"
          }`}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-[200px] w-[100px] relative">
            <div>
              <h1 className="text-[16px] font-bold text-[#333333] text-center">
                Done
              </h1>
            </div>
            <div className="flex justify-center mt-5">
              <svg
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33.0013 21.6673V15.6147C33.0013 9.8255 33.0013 6.93092 31.2928 5.13245C29.5841 3.33398 26.8343 3.33398 21.3346 3.33398H16.3346C10.8349 3.33398 8.08505 3.33398 6.37652 5.13245C4.66797 6.93092 4.66797 9.8255 4.66797 15.6147V24.3867C4.66797 30.1758 4.66797 33.0703 6.37652 34.8688C8.08505 36.6673 10.8349 36.6673 16.3346 36.6673H18.8346"
                  stroke="#004324"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M23 33.3327C23 33.3327 24.6667 33.3327 26.3333 36.666C26.3333 36.666 31.6275 28.3327 36.3333 26.666"
                  stroke="#004324"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.168 3.33398L12.305 4.15598C12.6375 6.15138 12.8038 7.14908 13.5032 7.74153C14.2026 8.33398 15.214 8.33398 17.237 8.33398H20.4323C22.4553 8.33398 23.4668 8.33398 24.1661 7.74153C24.8655 7.14908 25.0318 6.15138 25.3643 4.15598L25.5013 3.33398"
                  stroke="#004324"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.168 26.6673H18.8346M12.168 18.334H25.5013"
                  stroke="#004324"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShippingConfirm;
