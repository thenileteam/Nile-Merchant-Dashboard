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
import { toast } from "sonner";
import CreateOrderForm from "../Components/createorderform";
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import DashboardBox from "@/Components/Dashboard/DashboardBox";
import { UseCardLoader } from "@/Components/CustomLoaders/loaders";
import DashboardIntro from "@/Components/Dashboard/DashboardIntro";
import EmptyState from "@/Components/StaffManagement/EmptyState";
import{EmptyOrderIcon} from '../Components/Store/AllStoreComp/StoreSettingIcons'
import { FiPlus } from "react-icons/fi";
const Orders = () => {
  //user profile image
  const { user } = useFetchUser();
  const { addOrderToBackend, isAddingOrder } = useCreateNewOrder(() => {
    setCreateOrderForm(false);
  });
  const store = JSON.parse(localStorage.getItem("store"));
  const { isCollapsed } =
    useSidebarStore();
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
    console.log("here");
    try {
      const itemsFromLocalStorage = JSON.parse(
        localStorage.getItem("orderItems")
      );
      const customerFromLocalStorage = JSON.parse(
        localStorage.getItem("customer")
      )?.[0];
      const customer = selectedCustomer[0];

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

      addOrderToBackend(orderData);
    } catch (error) {
      console.error(error);
    }
  };
  const [cart, setCart] = useState([]);

  return (
    <>
      <div
        className={`mt-[73px]
            ${
              isCollapsed
                ? "flex-grow lg:ml-20 overflow-x-hidden"
                : "flex-grow lg:ml-56 overflow-x-hidden"
            }
         `}>
        {createOrderForm ?
          <CreateOrderForm
            addOrder={addOrder}
            isAddingOrder={isAddingOrder}
            handleDateChange={handleDateChange}
            cart={cart}
            setPaymentStatus={setPaymentStatus}
            paymentStatus={paymentStatus}
            setSelectProductForm={setSelectProductForm}
            selectProductForm={selectProductForm}
            salesChannel={salesChannel}
            setSalesChannel={setSalesChannel}
            selectedCustomer={selectedCustomer}
            setSelectCustomerForm={setSelectCustomerForm}
            setCreateOrderForm={setCreateOrderForm}
            setSelectedCustomer={setSelectedCustomer}
            createOrderForm={createOrderForm}
            setCart={setCart}
          />:
         <div className="overflow-y-hidden ">
          {selectCustomerForm && (
            <SelectCustomerform
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
              setSelectCustomerForm={setSelectCustomerForm}
            />
          )}
         
          <div
            className={`mb-6 px-2 ${
              isCollapsed ? "lg:max-w-[1100px]" : "lg:max-w-[950px]"
            }   lg:px-0 mx-auto max-w-full`}
          >
           
            <article className="flex flex-col lg:flex-row gap-2 lg:justify-between mb-10 lg:items-center">
              <DashboardIntro introText="Order Management" />
              <button type="button" className="bg-green text-white p-2 w-[140px] flex items-center rounded-md justify-center gap-1" onClick={()=>setCreateOrderForm(true)}><FiPlus/>Create Order</button>
               
            </article> 
            {/* Cards */}
             <div className="flex gap-8 lg:gap-20">
              <UseCardLoader amount={2} loading={isFetching} error={isError}>
                <>
                  <DashboardBox
                    text="Total Orders"
                    data={data?.length || 0}
                    spacing="my-5"
                    width="w-[50%]"
                  />
                  <DashboardBox
                    text="Total Complete Order"
                    data={0}
                    spacing="my-5"
                    width="w-[50%]"
                  /> 
                  {/*  data?.filter(item => item.status === 'pending' ) */}
                  {/* <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                      <img src={timer} alt="" />
                      <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                        0
                      </h1>
                      <p className="text-[#6E6E6E]">Average Delivery Time</p>
                    </div> */}
                 </>
              </UseCardLoader>
            </div>
          </div> 
            <div className="overflow-x-scroll lg:overflow-auto">
            <OrdersTable data={data} isCollapsed={isCollapsed} />
          </div> 
        </div> 
        }
      </div>


      {/* empty State */}
      <div
        className={`${
          isCollapsed ? "max-w-[1000px]" : "max-w-[800px]"
        }  mx-auto `}>
        {/* <div className="flex items-center"></div> */}
        {data && data.length === 0 && (
      
             <EmptyState
                 title="You have  no orders yet"
                 description="You'll get notified when receive your first order"
                 buttonText="Check your Customers"
                 icon={EmptyOrderIcon}
                 createOrderForm={createOrderForm}
                 setCreateOrderForm={setCreateOrderForm}
                 PopUpComponent={CreateOrderForm}
               /> 
        )}
      </div>
    </>
  );
};

export default Orders;
