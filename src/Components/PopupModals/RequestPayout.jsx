import { useState } from "react";
const RequestPayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinalModalOpen, setIsFinalModalOpen] = useState(false);

  // Function to handle closing the final modal after a few seconds
  const handleSend = () => {
    setIsModalOpen(false); // Close the first modal
    setIsFinalModalOpen(true); // Show final modal
    setTimeout(() => {
      setIsFinalModalOpen(false); // Automatically close after 3 seconds
    }, 1000);
  };

  return (
    <div>
      <button type='button'
         className="text-[#fff] bg-green flex font-bold gap-1 items-center hover:bg-transparent hover:text-[#004324] hover:border-[#004324] duration-500 border-2 p-2 rounded-md cursor-pointer"
        onClick={() => setIsModalOpen(true)} // Open the first modal on click
      >
        <div>
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.4349 13.9453L18.7646 10.2968C18.4751 8.72096 18.3303 7.93303 17.757 7.46651C17.1837 7 16.3602 7 14.7132 7H10.2868C8.6398 7 7.81628 7 7.24298 7.46651C6.66968 7.93303 6.52492 8.72096 6.23538 10.2968L5.56506 13.9453C4.96408 17.2162 4.66359 18.8517 5.58889 19.9259C6.51419 21 8.22355 21 11.6423 21H13.3577C16.7765 21 18.4858 21 19.4111 19.9259C20.3364 18.8517 20.0359 17.2162 19.4349 13.9453Z"
              stroke="currentcolor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M12.5 10.5V17M10 15L12.5 17.5L15 15"
              stroke="currentcolor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.5 11C21.6568 10.9209 21.7931 10.8212 21.9142 10.6955C22.5 10.0875 22.5 9.10893 22.5 7.15176C22.5 5.1946 22.5 4.21602 21.9142 3.60801C21.3284 3 20.3856 3 18.5 3H6.5C4.61438 3 3.67157 3 3.08579 3.60801C2.5 4.21602 2.5 5.1946 2.5 7.15176C2.5 9.10893 2.5 10.0875 3.08579 10.6955C3.20688 10.8212 3.34322 10.9209 3.5 11"
              stroke="currentcolor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        Request Payout
      </button>

      {/* First Modal (Confirmation) */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-[#f5f5f5] p-16 rounded-md shadow-lg w-[553px] h-[377px]">
            <button type="button" className="absolute right-2 top-2 text-lightGreen border border-lightGreen w-6 rounded-md"  onClick={() => setIsModalOpen(false)}>x</button>
            <div className="flex justify-center gap-20">
              <div>
                <h1 className="text-[#333333] font-bold text-[20px]">
                  Payment Method
                </h1>
                <p className="text-[#6E6E6E]">Bank Transfer</p>
                <div>
                  <label
                    htmlFor="EnterAmount"
                    className="block font-bold text-[#333333] text-[16px] mt-5"
                  >
                    {" "}
                    Payment Amount{" "}
                  </label>

                  <input
                    type="text"
                    id="EnterAmount"
                    placeholder="Enter Amount"
                    className="mt-1 w-full rounded-md border-[#6E6E6E] border-2 p-3 shadow-sm sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-[#333333] font-bold text-[20px]">
                  Payment Details
                </h1>
                <p className="text-[#6E6E6E]">Akanni Ishak</p>
                <p className="text-[#6E6E6E]">96346193</p>
                <p className="text-[#6E6E6E]">Stanbic IBTC</p>
              </div>
            </div>
            <div className="flex justify-center gap-20 mt-12">
              <button
                onClick={handleSend} // Handle send action
              >
                <h1 className="hover:text-[#004324] duration-500 flex font-bold gap-1 items-center border-[#004324] bg-[#004324] hover:bg-[#f5f5f5] text-[#ffffff] border-2 p-2 rounded cursor-pointer">
                  <div>
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.4349 13.9453L18.7646 10.2968C18.4751 8.72096 18.3303 7.93303 17.757 7.46651C17.1837 7 16.3602 7 14.7132 7H10.2868C8.6398 7 7.81628 7 7.24298 7.46651C6.66968 7.93303 6.52492 8.72096 6.23538 10.2968L5.56506 13.9453C4.96408 17.2162 4.66359 18.8517 5.58889 19.9259C6.51419 21 8.22355 21 11.6423 21H13.3577C16.7765 21 18.4858 21 19.4111 19.9259C20.3364 18.8517 20.0359 17.2162 19.4349 13.9453Z"
                        stroke="currentcolor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12.5 10.5V17M10 15L12.5 17.5L15 15"
                        stroke="currentcolor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M21.5 11C21.6568 10.9209 21.7931 10.8212 21.9142 10.6955C22.5 10.0875 22.5 9.10893 22.5 7.15176C22.5 5.1946 22.5 4.21602 21.9142 3.60801C21.3284 3 20.3856 3 18.5 3H6.5C4.61438 3 3.67157 3 3.08579 3.60801C2.5 4.21602 2.5 5.1946 2.5 7.15176C2.5 9.10893 2.5 10.0875 3.08579 10.6955C3.20688 10.8212 3.34322 10.9209 3.5 11"
                        stroke="currentcolor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  Request Payout
                </h1>
              </button>
              <button
                className="hover:bg-[#004324] hover:text-white duration-500 font-bold text-[#004324] bg-[#f5f5f5] px-10 py-2 rounded"
                onClick={() => setIsModalOpen(false)} // Close modal
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final Modal (Success Message) */}
      {isFinalModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#f5f5f5] text-center font-bold text-[#333333] p-5 rounded-md shadow-lg max-w-md w-full">
            <h1>
              Your Payment Request Has Been Sent Successfully. You’ll Receive
              Your Payment within 5 Business Days
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestPayout;
