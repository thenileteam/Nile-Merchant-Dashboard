import React from "react";
import { AiOutlineLoading } from "react-icons/ai";
import CustomDropdown from "./uicomps/customdropdown";
import CustomSalesChannelDropdown from "./uicomps/customsaleschannel";
import CustomSearchInput from "./uicomps/customsearchinput";

const CreateOrderForm = ({
  setCreateOrderForm,
  addOrder,
  handleDateChange,
  paymentStatus,
  isAddingOrder,
  cart,
  setPaymentStatus,
  setSelectProductForm,
  salesChannel,
  setSalesChannel,
  setSelectCustomerForm,
  selectedCustomer,
  setSelectedCustomer,
}) => {
  return (
    <div
      className=" w-full fixed z-40  justify-center items-center flex h-screen border-2 border-blue-500"
      onClick={() => setCreateOrderForm(false)}
    >
      <div className=" w-full h-full bg-black/30 absolute top-0 left-0 "></div>
      <div
        style={{
          width: "80%",
        }}
        className=" rounded-[8px]  z-[400000000] mx-auto pt-[96px] pb-8 px-8 relative bg-white"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <img
          onClick={() => setCreateOrderForm(false)}
          src="/public/Cancel.svg"
          className=" cursor-pointer size-8 absolute top-8 right-8"
          alt=""
        />
        <div className=" flex w-full flex-col gap-4">
          <div className=" grid  grid-cols-2 gap-16">
            {/* <div className=" flex flex-col gap-2">
              <label
                className=" font-black  text-[16px]  leading-5 "
                htmlFor="Customer Name"
              >
                Customer Name <span className="opacity-50">(Optional)</span>
              </label>
              <div
                onClick={() => setSelectCustomerForm(true)}
                className=" bg-[#F5F5F5] cursor-pointer flex items-center px-4 rounded-[4px]  border-[#8ED06C] border-[1px] h-[50px] placeholder:text-[#6E6E6E80]"
              >
                {selectedCustomer.length > 0
                  ? selectedCustomer[0]?.name || selectedCustomer[0]?.email
                  : "Customer Name"}
              </div>
            </div> */}
            <div className=" flex flex-col gap-2">
              <label
                className=" font-black  text-[16px]  leading-5 "
                htmlFor="Sales Channel"
              >
                Select Customer
              </label>
              <CustomSearchInput
                setSelectedCustomer={setSelectedCustomer}
                selectedCustomer={selectedCustomer}
              />
            </div>

            <div className=" flex flex-col gap-2">
              <label
                className=" font-black  text-[16px]  leading-5 "
                htmlFor="Sales Channel"
              >
                Sales Channel
              </label>
              <div className=" bg-[#F5F5F5]  rounded-[4px]  border-[#8ED06C] border-[1px]  placeholder:text-[#6E6E6E80]">
                <CustomSalesChannelDropdown
                  setSalesChannel={setSalesChannel}
                  salesChannel={salesChannel}
                />
                <img
                  className=" absolute  top-1/2 -translate-y-1/2 right-4"
                  src="/public/plus.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-16">
            <div className=" flex flex-col gap-2">
              <label
                className=" font-black  text-[16px]  leading-5 "
                htmlFor="Product Name"
              >
                Product Select
              </label>
              <div
                onClick={() => setSelectProductForm(true)}
                //   placeholder="Select Product"
                //   type="text"
                className="flex items-center  cursor-pointer bg-[#F5F5F5]  h-[50px] rounded-[4px]  border-[#8ED06C] border-[1px] px-4 placeholder:text-[#6E6E6E80]"
              >
                {cart.length > 0 ? "Product In Cart , View" : "Select Product"}
              </div>
            </div>
            <div className=" flex flex-col gap-2">
              <label
                className=" font-black  text-[16px]  leading-5 "
                htmlFor="Sales Channel"
              >
                Payment Status
              </label>
              <div className=" bg-[#F5F5F5]  rounded-[4px]  border-[#8ED06C] border-[1px]  placeholder:text-[#6E6E6E80]">
                <CustomDropdown
                  paymentStatus={paymentStatus}
                  setPaymentStatus={setPaymentStatus}
                />
                <img
                  className=" absolute  top-1/2 -translate-y-1/2 right-4"
                  src="/public/plus.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-2 gap-16">
            <div className=" flex flex-col gap-2">
              <label
                className=" font-black  text-[16px]  leading-5 "
                htmlFor="Order Date"
              >
                Order Date
              </label>
              <input
                onChange={(e) => handleDateChange(e)}
                placeholder="DD/MM/YY"
                type="date"
                className="bg-[#F5F5F5] rounded-[4px] border-[#8ED06C] border-[1px] h-[50px] px-4 placeholder:text-[#6E6E6E80]"
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
        </div>
        <button
          disabled={isAddingOrder}
          type="submit"
          onClick={addOrder}
          className=" flex bg-[#004324] justify-center items-center mx-auto mt-16 rounded-[4px] gap-1 p-[10.5px]  text-white "
        >
          {isAddingOrder ? (
            <AiOutlineLoading className=" animate-spin transition-all" />
          ) : (
            <>
              <img src="/plus.svg" alt="Plus Icon" />
              <span>Create Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CreateOrderForm;
