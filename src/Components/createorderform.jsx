/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AiOutlineLoading } from "react-icons/ai";
import CustomDropdown from "./uicomps/customdropdown";
import CustomSalesChannelDropdown from "./uicomps/customsaleschannel";
import CustomSearchInput from "./uicomps/customsearchinput";
import { FiArrowLeft, FiChevronDown } from "react-icons/fi";
import SelectProductForm from '../Components/Orders/selectproductform'
const CreateOrderForm = ({
  setCreateOrderForm,
  addOrder,
  handleDateChange,
  paymentStatus,
  isAddingOrder,
  cart,
  setCart,
  setPaymentStatus,
  setSelectProductForm,
  salesChannel,
  setSalesChannel,
  createOrderForm,
  selectedCustomer,
  setSelectedCustomer,
  selectProductForm
}) => {
  return (
    <>
      {createOrderForm && (
        <div className=" ">
          <div
            className="w-full lg:max-w-[875px] mx-auto p-4 relative bg-white rounded-xl"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="flex gap-1">
              <button
                type="button"
                className="rounded-md "
                onClick={() => setCreateOrderForm(false)}
              >
                <FiArrowLeft className="text-green text-2xl" />
              </button>
              <h3 className="text-[32px] text-green font-semibold">Add Order</h3>
            </div>
            <div className="grid lg:grid-cols-2 gap-3 lg:gap-16 mt-6 ">
              <div className="flex flex-col gap-2 mb-4  ">
                <label
                  className=" text-[16px] leading-5 text-[#6e6e6e] font-semibold"
                  htmlFor="Sales Channel"
                >
                  Select Customer{" "}
                  <span className="text-[#6e6e6e] font-normal">(Optional)</span>
                </label>
                <CustomSearchInput
                  setSelectedCustomer={setSelectedCustomer}
                  selectedCustomer={selectedCustomer}
                />
              </div>

              <div className="flex flex-col gap-2 ">
                <label
                  className="text-[#6e6e6e] font-semibold  text-[16px]  leading-5 "
                  htmlFor="Sales Channel"
                >
                  Sales Channel
                </label>
                <div className="relative bg-[#F5F5F5]  rounded-[4px]  border-[#6e6e6e] border  placeholder:text-[#6E6E6E80]">
                  <CustomSalesChannelDropdown
                    setSalesChannel={setSalesChannel}
                    salesChannel={salesChannel}
                  />
                  <FiChevronDown className="absolute top-[18px] right-4" />
                </div>
              </div>
            </div>
            {/* the problem */}
            <div className=" grid gap-2 lg:grid-cols-2 lg:gap-16">
              <div className=" flex flex-col gap-2 mb-4 relative ">
                <label
                  className="font-semibold text-[#6e6e6e]  text-[16px] leading-5"
                  htmlFor="Product Name"
                >
                  Product Name
                </label>
                <div
                  // onClick={() => setSelectProductForm(prev=>!prev)}
                    // className="cursor-pointer bg-[#F5F5F5] rounded-[4px] p-3 border-[#6e6e6e] border px-4 placeholder:text-[#6E6E6E80] "
                 >
                  {/* <div className="flex items-center justify-between">
                  {cart.length > 0
                    ? "Product In Cart"
                    : "Select Product"}
                  <FiChevronDown className="w-5 "/>

                  </div> */}
                  <SelectProductForm
                    cart={cart}
                    setCart={setCart}
                    setSelectProductForm={setSelectProductForm}
                    selectProductForm={selectProductForm}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  className=" font-semibold text-[#6e6e6e]  text-[16px]  leading-5 "
                  htmlFor="Sales Channel"
                >
                  Payment Status
                </label>
                <div className="relative bg-[#F5F5F5]  rounded-[4px]  border-[#6e6e6e] border  placeholder:text-[#6E6E6E80]">
                  <CustomDropdown
                    paymentStatus={paymentStatus}
                    setPaymentStatus={setPaymentStatus}
                  />
                  <FiChevronDown className=" absolute top-[18px] right-4" />
                </div>
              </div>
            </div>
            <div className=" grid lg:grid-cols-2 gap-2 lg:gap-16">
              <div className=" flex flex-col gap-2">
                <label
                  className=" font-semibold text-[#6e6e6e] text-[16px]  leading-5 "
                  htmlFor="Order Date"
                >
                  Order Date
                </label>
                <input
                  onChange={(e) => handleDateChange(e)}
                  placeholder="DD/MM/YY"
                  type="date"
                  className="bg-[#F5F5F5] rounded-[4px] border-[#6e6e6e] border h-[50px] px-4 placeholder:text-[#6E6E6E80]"
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div className="flex gap-5 items-center justify-center my-7 ">
              <button
                type="button"
                className="border-green border-2 p-2 w-[150px] rounded-md text-green"
                onClick={() => setCreateOrderForm(false)}
              >
                Cancel
              </button>
              <button
                disabled={isAddingOrder}
                type="submit"
                onClick={addOrder}
                className=" flex bg-green items-center rounded-[4px] gap-1 p-[10.5px]  text-white"
              >
                {isAddingOrder ? (
                  <AiOutlineLoading className=" animate-spin transition-all" />
                ) : (
                  <>
                    <img src="/plus.svg" alt="Plus Icon" />
                    <span>Add Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateOrderForm;
