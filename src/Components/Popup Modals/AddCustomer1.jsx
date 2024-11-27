/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { reload } from "../../assets";
import { useAddCustomer } from "../../datahooks/users/userhooks";
import { toast } from "sonner";
import { LuLoader2 } from "react-icons/lu";

const AddCustomer1 = ({ transparent }) => {
  const { addCustomerQuery, addCustomerQueryError, addCustomerQueryIsPending } =
    useAddCustomer(() => {
      setIsFinalConfirmationOpen(false);
    });
  const [customerData, setCustomerData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  // State to control the popup visibility and animation
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isFinalConfirmationOpen, setIsFinalConfirmationOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); // State for fade-out animation

  // // Function to generate a random code
  // const generateCustomerID = () => {
  //   const code = `CUS-${Math.floor(100000 + Math.random() * 900000)}`;
  //   setCustomerID(code);
  // };

  // Function to toggle the main popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const handleCustomerDataChange = (event) => {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({ ...prevData, [name]: value }));
  };
  // Function to show the confirmation popup and hide the main popup
  const showConfirmation = () => {
    setFadeOut(true); // Start fade-out animation for the main popup
    setTimeout(() => {
      setIsPopupOpen(false); // Close the main popup after the animation
      setIsConfirmationOpen(true); // Open the confirmation popup
      setFadeOut(false); // Reset fade-out state
    }, 200); // Match this duration with your CSS transition duration
  };
  const addCustomer = () => {
    if (
      !customerData.name ||
      !customerData.email ||
      !customerData.phoneNumber
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    addCustomerQuery(customerData);
  };
  console.log(customerData);
  // const handleConfirm = async () => {
  //   setFadeOut(true);
  //   setTimeout(async () => {
  //     try {
  //       const response = await axios.post("/api/customers", {
  //         name: customerName,
  //         phoneNumber,
  //         email: emailAddress,
  //         customerID,
  //       });

  //       console.log("Customer added successfully:", response.data);
  //       setIsConfirmationOpen(false);
  //       setIsFinalConfirmationOpen(true);
  //       setFadeOut(false);

  //       // Close final confirmation popup after a few seconds
  //       setTimeout(() => {
  //         setIsFinalConfirmationOpen(false);
  //       }, 2000); // Adjust this duration to control how long the popup is displayed
  //     } catch (error) {
  //       console.error("Error adding customer:", error);
  //     }
  //   }, 300);
  // };

  const toggleConfirmation = () => {
    setFadeOut(true);
    setTimeout(() => {
      setIsConfirmationOpen(!isConfirmationOpen);
      setFadeOut(false);
    }, 300);
  };

  return (
    <>
      {/* Button to trigger the popup */}
      <button
        onClick={togglePopup}
        className={
          transparent
            ? "text-[#004324] flex flex-row font-bold gap-1 items-center border-[#004324] hover:bg-[#004324] hover:text-[#ffffff] duration-500 border-2 p-2 rounded-md"
            : "text-[#ffffff] bg-[#004324] p-3 font-bold rounded-md"
        }
      >
        {transparent && (
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 8V16M16.5 12H8.5"
              stroke="currentcolor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 12C3 7.52166 3 5.28249 4.39124 3.89124C5.78249 2.5 8.02166 2.5 12.5 2.5C16.9783 2.5 19.2175 2.5 20.6088 3.89124C22 5.28249 22 7.52166 22 12C22 16.4783 22 18.7175 20.6088 20.1088C19.2175 21.5 16.9783 21.5 12.5 21.5C8.02166 21.5 5.78249 21.5 4.39124 20.1088C3 18.7175 3 16.4783 3 12Z"
              stroke="currentcolor"
              strokeWidth="1.5"
            />
          </svg>
        )}
        Add Customers
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full relative">
            {/* Cancel Button in the top-right corner */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setIsPopupOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Popup Content */}
            <form>
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-3">
                  <div>
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-[16px] font-bold text-[#333333]"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        className="w-full border-[#8ED06C] border-2 bg-[#F5F5F5] rounded-md p-2"
                        placeholder="Add The Customer's Name"
                        value={customerData.name}
                        onChange={handleCustomerDataChange}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <label
                        htmlFor="phonenumber"
                        className="block text-[16px] font-bold text-[#333333]"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phoneNumber"
                        type="text"
                        name="phoneNumber"
                        className="w-full border-[#8ED06C] border-2 bg-[#F5F5F5] rounded-md p-2"
                        placeholder="Add The Customer's Phone Number"
                        value={customerData.phoneNumber}
                        onChange={handleCustomerDataChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="mb-4">
                    <label
                      htmlFor="emailaddress"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="w-full border-[#8ED06C] border-2 bg-[#F5F5F5] rounded-md p-2"
                      placeholder="Add The Customer's Email"
                      value={customerData.email}
                      onChange={handleCustomerDataChange}
                    />
                  </div>
                  {/* <div className="relative">
                    <label
                      htmlFor=""
                      className="block font-bold text-[16px] text-[#333333]"
                    >
                      {" "}
                      Customer ID{" "}
                    </label>
                    <input
                      type="text"
                      id=""
                      placeholder="Generate Code"
                      className="w-full rounded-md border-[#8ED06C] border-2 bg-[#F5F5F5] py-2 pe-10 shadow-sm p-2"
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
                  </div> */}
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-16">
                {/* Edit Button */}
                <button
                  className="px-2 py-2 hover:bg-[#004324] bg-[#f5f5f5] border-[#004324] border-2 text-[#004324] font-medium rounded-md shadow-lg hover:text-[#ffffff] transition ease-out duration-700"
                  onClick={showConfirmation}
                  type="button"
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
                        d="M12.5 8V16M16.5 12H8.5"
                        stroke="currentcolor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 12C3 7.52166 3 5.28249 4.39124 3.89124C5.78249 2.5 8.02166 2.5 12.5 2.5C16.9783 2.5 19.2175 2.5 20.6088 3.89124C22 5.28249 22 7.52166 22 12C22 16.4783 22 18.7175 20.6088 20.1088C19.2175 21.5 16.9783 21.5 12.5 21.5C8.02166 21.5 5.78249 21.5 4.39124 20.1088C3 18.7175 3 16.4783 3 12Z"
                        stroke="currentcolor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <p>Add Customer</p>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="bg-white flex justify-center items-center flex-col gap-3 p-5 rounded-lg shadow-lg max-w-sm w-full transform transition-all duration-300">
            <h1 className="text-[#333333] font-bold text-[18px] text-center">
              Are You Sure You Want To Add This Customer?
            </h1>
            {addCustomerQueryIsPending ? (
              <LuLoader2 className=" animate-spin duration-300 transition-all" />
            ) : (
              <div className="flex justify-center gap-20">
                <button onClick={addCustomer}>
                  <div className="flex mt-10">
                    <h1 className="text-[#333333] flex font-bold gap-1 items-center hover:border-[#ffffff] hover:bg-[#E2E8F0] transition ease-out duration-500 border-[#004324] border-2 p-2 px-6 rounded-md">
                      Yes
                    </h1>
                  </div>
                </button>
                <button onClick={toggleConfirmation}>
                  <div className="flex mt-10">
                    <h1 className="text-[#ffffff] hover:text-[#333333] transition ease-out duration-700 flex font-bold gap-1 items-center border-[#004324] hover:bg-[#E2E8F0] bg-[#004324] border-2 p-2 px-6 rounded-md">
                      No
                    </h1>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Final Confirmation Popup */}
      {isFinalConfirmationOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-[200px] w-full transform transition-all duration-300">
            <div>
              <h1 className="text-[16px] font-bold text-[#333333] text-center">
                Customer Added
              </h1>
            </div>
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
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M23.5108 27.1843C27.2773 22.8187 30.9133 19.857 35.4806 15.663C36.8476 14.4076 37.0588 12.2072 35.9863 10.6482C34.8466 8.9913 32.6808 8.66013 31.215 9.97733C27.0313 13.7366 23.7765 17.3562 20.689 21.225C20.527 21.428 20.446 21.5295 20.3618 21.5867C20.1486 21.7315 19.8821 21.7332 19.6676 21.5907C19.583 21.5345 19.5018 21.4348 19.3395 21.2358L17.6943 19.2178C16.1931 17.3765 13.5006 17.5803 12.2472 19.6302C11.3701 21.0647 11.5001 22.9657 12.5626 24.2423L15.1425 27.3428C17.0721 29.6617 18.037 30.8212 19.1953 30.8327C20.3536 30.844 21.406 29.624 23.5108 27.1843Z"
                  stroke="#004324"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCustomer1;
