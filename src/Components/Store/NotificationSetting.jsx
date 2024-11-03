import React from "react";
import { arrowleft, image, notification, roundedimage } from "../../assets";
import { Link } from "react-router-dom";
import SaveChanges from "../Popup Modals/SaveChanges";

const NotificationSetting = () => {
  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="bg-[#EAF4E2] p-4 shadow-md flex items-center justify-center gap-5 fixed w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/store">
                <img src={arrowleft} alt="" />
              </Link>
              <h1 className="text-[32px] font-bold">Notification Settings</h1>
            </div>
            <div className="flex items-center gap-10 ml-[525px]">
              <div className="relative">
                <label htmlFor="Search" className="sr-only">
                  {" "}
                  Search{" "}
                </label>

                <input
                  type="text"
                  id="Search"
                  placeholder=""
                  className="w-[300px] rounded-md border-[#6E6E6E] border-2 p-8 py-2.5 pe-10 shadow-sm sm:text-sm"
                />

                <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-700"
                  >
                    <span className="sr-only">Search</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              <div>
                <Link to="/notification">
                  <img src={notification} alt="" />
                </Link>
              </div>
              <div>
                <Link to="/profilesetting">
                  <img src={image} alt="" />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* Input Fields */}
      <div className="flex px-28 gap-28 justify-center mx-auto">
        <div className="space-y-5">
          <div>
            <h1 className="text-[#004324] text-[24px] font-bold">
              Store Notifications
            </h1>
          </div>
          <form
            action="#"
            className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg"
          >
            <div className="space-y-3">
              <div>
                <h1 className="text-[#333333] text-[20px] font-bold">
                  Store Notifications
                </h1>
                <p className="text-[#6E6E6E] text-sm">
                  Choose How You Want To Receive Update For Your Store
                </p>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    New Order
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Receive Notification For New Orders
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Inventory Alert
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Receive Notification For Low Stock
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Review Alert
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Receive Notification When Customers Leave Review
                  </p>
                </div>
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

          <form
            action="#"
            className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg"
          >
            <div className="space-y-3">
              <div>
                <h1 className="text-[#333333] text-[20px] font-bold">
                  Account Notifications
                </h1>
                <p className="text-[#6E6E6E] text-sm">
                  Notifications about updates and security changes to your
                  account
                </p>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Subscription & Billing Alert
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Receive Update About Your Billing Informations
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Login Activity
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Receive Alert On Unauthorized Access
                  </p>
                </div>
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

          <form
            action="#"
            className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg"
          >
            <div className="space-y-3">
              <div>
                <h1 className="text-[#333333] text-[20px] font-bold">
                  Delivery Method
                </h1>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Email Notifications
                  </h1>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    SMS Notifications
                  </h1>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Push Notification
                  </h1>
                </div>
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

        <div className="space-y-5">
          <div>
            <h1 className="text-[#004324] text-[24px] font-bold">
              Customer's Notifications
            </h1>
          </div>
          <form
            action="#"
            className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg"
          >
            <div>
              <h1 className="text-[20px] text-[#333333] font-bold">
                Sender Email
              </h1>
              <p className="text-[#6E6E6E] text-sm">
                The Email That Will Show When Your Store Send Out Emails
              </p>
              <input
                type="text"
                className="w-full p-2 rounded-sm placeholder:text-sm"
                placeholder="jacobustore@gmail.com"
              />
              <button className="text-[#8ED06C] font-bold flex justify-center mx-auto mt-5">
                Send Verification
              </button>
            </div>
          </form>

          <form
            action="#"
            className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg"
          >
            <div className="space-y-3">
              <div>
                <h1 className="text-[#333333] text-[20px] font-bold">
                  Order Processing
                </h1>
                <p className="text-[#6E6E6E] text-sm">
                  Choose When To Send Notification
                </p>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Order Confirmation
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Sent when a customer places an order
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Draft Order Invoice
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Sent when an order is left uncompleted by customer
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Shipping Confirmation
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Sent when an order as been shipped
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Order Canceled
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Sent when you cancel an order
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Order Refunded
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Sent when an order has been after cancelation
                  </p>
                </div>
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

          <form
            action="#"
            className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg"
          >
            <div className="space-y-3">
              <div>
                <h1 className="text-[#333333] text-[20px] font-bold">
                  Local Pickup
                </h1>
                <p className="text-[#6E6E6E] text-sm">
                  Choose When To Send Notification
                </p>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Ready For Pickup
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Sent when a an order is ready to be picked up
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Picked Up By Customer
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Sent to when an order is picked up by the customer
                  </p>
                </div>
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

        <div className="space-y-5">
          <form
            action="#"
            className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg"
          >
            <div className="space-y-3">
              <div>
                <h1 className="text-[#333333] text-[20px] font-bold">
                  Payment
                </h1>
                <p className="text-[#6E6E6E] text-sm">
                  Choose When To Send Notification
                </p>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Payment Error
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Sent if a customer’s payment can’t be processed{" "}
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Pending Payment
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Sent when a payment is pending at checkout
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Pending Payment Success
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Sent after a customer’s pending payment has been processed
                    successfully
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Pending Payment Error
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Sent when a customer’s pending payment can’t be processed
                  </p>
                </div>
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

          <form
            action="#"
            className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg"
          >
            <div className="space-y-3">
              <div>
                <h1 className="text-[#333333] text-[20px] font-bold">
                  Delivery
                </h1>
                <p className="text-[#6E6E6E] text-sm">
                  Choose When To Send Notification
                </p>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Order Out For Delivery
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Sent when an order is out for delivery
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Order Delivered
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Sent when an order has been delivered
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Order Missed Delivery
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Sent when a customer misses a delivery
                  </p>
                </div>
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
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-10 mb-7">
        <SaveChanges />
      </div>
    </>
  );
};

export default NotificationSetting;
