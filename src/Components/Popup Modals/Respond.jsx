import React, { useState } from "react";

const Respond = () => {
  const [isInputPopupOpen, setInputPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [response, setResponse] = useState("");

  // Handle the "Respond" button click to open the input popup
  const handleRespondClick = () => {
    setInputPopupOpen(true);
  };

  // Handle the "Send" button click to show the final confirmation popup
  const handleSendClick = () => {
    setInputPopupOpen(false);
    setConfirmationPopupOpen(true);

    // Automatically close confirmation popup after 3 seconds
    setTimeout(() => {
      setConfirmationPopupOpen(false);
    }, 500);
  };

  return (
    <>
      <div className="response-component">
        {/* Respond button in the table */}
        <td
          className="px-2 py-3 text-center text-[#8ED06C] flex justify-center cursor-pointer"
          onClick={handleRespondClick}
        >
          Respond
        </td>

        {/* Input Popup */}
        {isInputPopupOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
              <h2 className="text-xl font-semibold mb-4">Your response</h2>
              <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Type your response here..."
              />
              <button
                className="bg-[#f5f5f5] text-[#004324] font-bold border-2 border-[#004324] hover:bg-[#004324] hover:text-[#ffffff] duration-500 py-2 px-4 rounded flex justify-center mx-auto"
                onClick={handleSendClick}
              >
                <div className="flex items-center gap-1">
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.7892 21.9609H9.89111C6.64261 21.9609 5.01836 21.9609 4.00918 20.9358C3 19.9106 3 18.2607 3 14.9609V9.96093C3 6.6611 3 5.01119 4.00918 3.98607C5.01836 2.96094 6.64261 2.96094 9.89111 2.96094H12.8444C16.0929 2.96094 17.9907 3.01612 19 4.04125C20.0092 5.06637 20 6.6611 20 9.96093V11.1473"
                      stroke="currentColor" // Use currentColor to make the stroke inherit the button's text color
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16.4453 2V4M11.4453 2V4M6.44531 2V4"
                      stroke="currentColor" // Inherit text color
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.5 15H11.5M7.5 10H15.5"
                      stroke="currentColor" // Inherit text color
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      opacity="0.93"
                      d="M21.2598 14.8785C20.3544 13.8641 19.8112 13.9245 19.2076 14.1056C18.7851 14.166 17.3365 15.8568 16.7329 16.3952C15.7419 17.3743 14.7464 18.3823 14.6807 18.5138C14.4931 18.8188 14.3186 19.3592 14.2341 19.963C14.0771 20.8688 13.8507 21.8885 14.1375 21.9759C14.4242 22.0632 15.2239 21.8954 16.1293 21.7625C16.7329 21.6538 17.1554 21.533 17.4572 21.3519C17.8797 21.0983 18.6644 20.2046 20.0164 18.8761C20.8644 17.9833 21.6823 17.3664 21.9238 16.7626C22.1652 15.8568 21.8031 15.3737 21.2598 14.8785Z"
                      stroke="currentColor" // Inherit text color
                      stroke-width="1.5"
                    />
                  </svg>
                  <p>Respond Now</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Popup */}
        {isConfirmationPopupOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
              <p className="text-lg font-semibold">Response Sent</p>
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
    </>
  );
};

export default Respond;
