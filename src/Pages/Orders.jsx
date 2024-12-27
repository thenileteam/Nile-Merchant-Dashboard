/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
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
import SelectCustomerform from "../Components/Orders/selectcustomerform";
import SelectProductForm from "../Components/Orders/selectproductform";
import { useCreateNewOrder } from "../datahooks/orders/orderhooks";
import Skeleton from "react-loading-skeleton";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import { toast } from "sonner";
import CreateOrderForm from "../Components/createorderform";
import {useSidebarStore }from '../ZustandStores/sidebarStore'
import DashboardBox from "@/Components/Dashboard/DashboardBox";
const Orders = () => {
  //user profile image
  const { user } = useFetchUser();
  const { addOrderToBackend, isAddingOrder } = useCreateNewOrder(() => {
    setCreateOrderForm(false);
  });
  const store = JSON.parse(localStorage.getItem("store"));
  const{sidebarOpen, setSidebarOpen, closeSidebar, isCollapsed} = useSidebarStore()
  const [createdAt, setCreatedAt] = useState(null);
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
    console.log('here')
    try {
          const itemsFromLocalStorage = JSON.parse(
        localStorage.getItem("orderItems")
      );
      const customerFromLocalStorage = JSON.parse(
        localStorage.getItem("customer")
      )?.[0];
      const customer = selectedCustomer[0]

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
        phoneNumber: customer?.phoneNumber || null,
        name: customer?.name || null,
        email: customer?.email || null,
        paymentStatus: paymentStatus,
        createdAt: createdAt,
        customerId: customer?.id,
        storeId: store.id,
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
      <div className="bg-[#F5F5F5] overflow-y-hidden pb-20">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />

          {/* Navbar */}
          <div className={`flex-grow ${isCollapsed? 'lg:ml-20':'lg:ml-56'}  overflow-y-hidden lg:overflow-x-hidden`}>
            <Navbar
              title="Orders"
              icon={trolley}
              profilePic={user && user.image ? user.image : ""}
            />

            {/* Cards */}
            <div className={`mt-20 lg:mt-28 mb-6 px-2 ${isCollapsed?'lg:max-w-[1000px]':'lg:max-w-[800px]'}   lg:px-0 mx-auto max-w-full`}>
              <div className="flex gap-8 lg:gap-20">
                {isFetching ? (
                  <div className="grid grid-cols-3 gap-20">
                    {" "}
                    <Skeleton className=" w-[300px] h-[150px] rounded-sm" />{" "}
                    <Skeleton className=" w-[300px] h-[150px] rounded-sm" />{" "}
                    {/* <Skeleton className=" w-[300px] h-[150px] rounded-sm" />{" "} */}
                  </div>
                ) : (
                  <>
                      <DashboardBox text='Total Orders' bgColor='bg-[#FCDADF]' image={shoppingcart} data={data?.length || 0} imgWidth='w-9'  width='w-[50%]'  />
                      <DashboardBox text='Pending Shipments' bgColor='bg-[#FFE8DF]' imgWidth='w-9'  image={truck1} data={0}  width='w-[50%]' />
                      {/*  data?.filter(item => item.status === 'pending' ) */}
                    {/* <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                      <img src={timer} alt="" />
                      <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                        0
                      </h1>
                      <p className="text-[#6E6E6E]">Average Delivery Time</p>
                    </div> */}
                  </>
                )}
              </div>
            </div>
            <div className={`${isCollapsed?'max-w-[1000px]':'max-w-[800px]'}  mx-auto`} >
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setCreateOrderForm(true)}
                  className=" flex bg-[#004324] rounded-[4px] gap-1 p-[10.5px] text-white "
                >
                  <img src="/public/plus.svg" alt="plus icon" />
                  Create Order
                </button>
                {/* <button className=" flex bg-white rounded-[4px] border border-[#8ED06C] gap-1 p-[10.5px]  text-[#8ED06C] ">
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
              <OrdersTable data={data} isCollapsed={ isCollapsed} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
