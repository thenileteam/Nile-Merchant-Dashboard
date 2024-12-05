/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Links from "../Links";
import {
  image,
  nilelogowhite,
  notification,
  trolley,
  shoppingcart,
  truck1,
  timer,
  shoppingcartremove,
} from "../assets";
import OrdersTable from "../Components/Orders/OrdersTable";
import { useFetchOrders, useFetchUser } from "../datahooks/users/userhooks";
import CustomDropdown from "../Components/uicomps/customdropdown";
import CustomSalesChannelDropdown from "../Components/uicomps/customsaleschannel";
import SelectCustomerform from "../Components/Orders/selectcustomerform";
import SelectProductForm from "../Components/Orders/selectproductform";
import { useCreateNewOrder } from "../datahooks/orders/orderhooks";
import { AiOutlineLoading } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import Navbar from "../Components/Navbar/Navbar";
import { toast } from "sonner";
import CreateOrderForm from "../Components/createorderform";

const Orders = () => {
  //user profile image
  const { user } = useFetchUser();
  const { addOrderToBackend, isAddingOrder } = useCreateNewOrder(() => {
    setCreateOrderForm(false);
  });
  const store = JSON.parse(localStorage.getItem("store"));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createdAt, setCreatedAt] = useState(null);
  const closeSidebar = () => {
    if (sidebarOpen) setSidebarOpen(false);
  };
  const [paymentStatus, setPaymentStatus] = useState("");
  const [salesChannel, setSalesChannel] = useState("");
  const { data, isError, isFetching } = useFetchOrders();
  const [createOrderForm, setCreateOrderForm] = useState(false);
  const [selectProductForm, setSelectProductForm] = useState(false);
  const [selectCustomerForm, setSelectCustomerForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setCreatedAt(selectedDate.toISOString());
  };
  // console.log(data);
  const addOrder = async () => {
    try {
      const itemsFromLocalStorage = JSON.parse(
        localStorage.getItem("orderItems")
      );
      const customerFromLocalStorage = JSON.parse(
        localStorage.getItem("customer")
      )?.[0];

      if (!itemsFromLocalStorage || itemsFromLocalStorage.items.length === 0) {
        toast.success("Please add products to order");
        return;
      }
      if (!paymentStatus) {
        toast.success("Please add a payment status");
        return;
      }
      if (!createdAt) {
        toast.success("Please add a date order was placed");
        return;
      }
      const newProducts = itemsFromLocalStorage.items.map(
        ({ id, ...rest }) => rest
      );
      const orderData = {
        totalAmount: itemsFromLocalStorage.totalAmount,
        items: newProducts,
        phoneNumber: customerFromLocalStorage?.phoneNumber || null,
        name: customerFromLocalStorage?.name || null,
        email: customerFromLocalStorage?.email || null,
        paymentStatus: paymentStatus,
        createdAt: createdAt,
        customerId: customerFromLocalStorage?.id,
        storeId: store._id,
        salesChannel,
      };

      await addOrderToBackend(orderData);
    } catch (error) {
      console.error(error);
    }
  };
  const [cart, setCart] = useState([]);

  return (
    <>
      {createOrderForm && (
        <CreateOrderForm
          addOrder={addOrder}
          isAddingOrder={isAddingOrder}
          handleDateChange={handleDateChange}
          cart={cart}
          setPaymentStatus={setPaymentStatus}
          paymentStatus={paymentStatus}
          setSelectProductForm={setSelectProductForm}
          salesChannel={salesChannel}
          setSalesChannel={setSalesChannel}
          selectedCustomer={selectedCustomer}
          setSelectCustomerForm={setSelectCustomerForm}
          setCreateOrderForm={setCreateOrderForm}
          setSelectedCustomer={setSelectedCustomer}
        />
      )}
      {selectCustomerForm && (
        <SelectCustomerform
          selectedCustomer={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
          setSelectCustomerForm={setSelectCustomerForm}
        />
      )}
      {selectProductForm && (
        <SelectProductForm
          cart={cart}
          setCart={setCart}
          setSelectProductForm={setSelectProductForm}
        />
      )}
      <div className="bg-[#F5F5F5] pb-20">
        <div className="flex">
          {/* Overlay for small screens */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black opacity-50 lg:hidden"
              onClick={closeSidebar}
            ></div>
          )}

          {/* Sidebar */}
          <div
            className={`fixed top-0 left-0 h-full w-[290px] z-20 bg-[#004324] border-2 text-white p-5 transition-transform transform ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0`}
          >
            <img
              src={nilelogowhite}
              alt=""
              className="w-[130px] flex mx-auto"
            />
            <Links />
          </div>

          {/* Navbar */}
          <div className="flex-grow lg:ml-64 overflow-x-hidden">
            <Navbar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              title="Orders"
              icon={trolley}
              profilePic={user && user.image ? user.image : ""}
            />

            {/* Cards */}
            <div className="p-6 mt-28 px-32">
              <div className="flex gap-28 justify-center">
                {isFetching ? (
                  <div className=" grid grid-cols-3 gap-10">
                    {" "}
                    <Skeleton className=" w-[300px] h-[150px] rounded-sm" />{" "}
                    <Skeleton className=" w-[300px] h-[150px] rounded-sm" />{" "}
                    {/* <Skeleton className=" w-[300px] h-[150px] rounded-sm" />{" "} */}
                  </div>
                ) : (
                  <>
                    <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                      <img src={shoppingcart} alt="" />
                      <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                        {data?.length || 0}
                      </h1>
                      <p className="text-[#6E6E6E]">Total Orders</p>
                    </div>
                    <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                      <img src={truck1} alt="" />
                      <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                        0
                      </h1>
                      <p className="text-[#6E6E6E]">Pending Shipment</p>
                    </div>
                    {/* <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                      <img src={timer} alt="" />
                      <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                        0
                      </h1>
                      <p className="text-[#6E6E6E]">Average Deliver Time</p>
                    </div> */}
                  </>
                )}
              </div>
            </div>

            <div className="max-w-[650px] mx-auto mt-4">
              <div className="flex items-center gap-16 ">
                <button
                  onClick={() => setCreateOrderForm(true)}
                  className=" flex bg-[#004324] rounded-[4px] gap-1 p-[10.5px]  text-white "
                >
                  <img src="/public/plus.svg" alt="plus icon" />
                  Create Order
                </button>
                {/* <button className=" flex bg-white rounded-[4px] border border-[#8ED06C] gap-1 p-[10.5px]  text-[#8ED06C] ">
                    <img src="/public/export.svg" alt="" />
                    Export CSV
                  </button> */}
              </div>

              {data && data.length === 0 && (
                <>
                  <div>
                    <img
                      src={shoppingcartremove}
                      alt=""
                      className="flex justify-center mx-auto"
                    />
                    <h1 className="text-[24px] font-extrabold text-center">
                      You Have No orders Yet
                    </h1>
                    <p className="text-[#6E6E6E] font-bold text-center">
                      You’ll get notified when you receive your first order
                    </p>
                  </div>

                  <div className="flex justify-center mt-3">
                    <button
                      type="button"
                      className="text-[#ffffff] bg-[#004324] p-3 font-bold rounded-md"
                    >
                      Check Your Customers
                    </button>
                  </div>
                </>
              )}
            </div>

            <div>
              <OrdersTable data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
