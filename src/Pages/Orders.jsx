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
import { useFetchOrders } from "../datahooks/users/userhooks";
import SelectCustomerform from "../Components/Orders/selectcustomerform";
// import SelectProductForm from "../Components/Orders/selectproductform";
import { useCreateNewOrder } from "../datahooks/orders/orderhooks";
import Skeleton from "react-loading-skeleton";
import { toast } from "sonner";
import CreateOrderForm from "../Components/createorderform";
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import DashboardBox from "@/Components/Dashboard/DashboardBox";
import { UseCardLoader } from "@/Components/CustomLoaders/loaders";
import DashboardIntro from "@/Components/Dashboard/DashboardIntro";
import EmptyState from "@/Components/StaffManagement/EmptyState";
import { EmptyOrderIcon } from "../Components/Store/AllStoreComp/StoreSettingIcons";
import { FiPlus } from "react-icons/fi";
import PageFilters from "@/Components/PageFilters/PageFilter";
import { useFilter } from "@/Components/PageFilters/usePageFilter";
import { motion, AnimatePresence } from "framer-motion";
const Orders = () => {
  const { data: orders, isError, isFetching } = useFetchOrders();
  console.log(orders);

  const orderFilter = (orders, selectedFilter) => {
    if (selectedFilter === "Paid") {
      return orders.filter((order) => order.paymentStatus === "PAID");
    } else if (selectedFilter === "Unpaid") {
      return orders.filter((order) => order.paymentStatus === "UNPAID");
    }
    return orders;
  };

  const {
    selectedFilter,
    handleActiveFilterChange,
    handleSearch,
    noResults,
    filteredItems: filteredOrders,
  } = useFilter(orders, orderFilter);
  const { addOrderToBackend, isAddingOrder } = useCreateNewOrder(() => {
    setCreateOrderForm(false);
  });
  const store = JSON.parse(localStorage.getItem("store"));
  const { isCollapsed } = useSidebarStore();
  const [createdAt, setCreatedAt] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [salesChannel, setSalesChannel] = useState("");
  const [createOrderForm, setCreateOrderForm] = useState(false);
  const [selectProductForm, setSelectProductForm] = useState(false);
  const [selectCustomerForm, setSelectCustomerForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  console.log(createOrderForm);
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setCreatedAt(selectedDate.toISOString());
  };
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
    <section>
      {orders?.length === 0 && createOrderForm === false ? (
        <div>
          <EmptyState
            title="You have  no orders yet"
            description="You'll get notified when receive your first order"
            buttonText="Check your Customers"
            icon={EmptyOrderIcon}
            showPopUp={createOrderForm}
            setShowPopUp={setCreateOrderForm}
            PopUpComponent={CreateOrderForm}
          />
          <div>
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
            />
          </div>
        </div>
      ) : (
        <div
          className={`mt-[73px]
            ${
              isCollapsed
                ? "flex-grow lg:ml-20 overflow-x-hidden"
                : "flex-grow lg:ml-56 overflow-x-hidden"
            }
         `}
        >
          {createOrderForm ? (
            <AnimatePresence mode="wait">
              <motion.div
                key="add-product"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
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
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="overflow-y-hidden ">
              {selectCustomerForm && (
                <SelectCustomerform
                  selectedCustomer={selectedCustomer}
                  setSelectedCustomer={setSelectedCustomer}
                  setSelectCustomerForm={setSelectCustomerForm}
                />
              )}

              <div
                className={`px-2 ${
                  isCollapsed ? "lg:max-w-[1130px]" : "lg:max-w-[950px]"
                }   lg:px-0 mx-auto max-w-full`}
              >
                <article className="flex flex-col lg:flex-row gap-2 lg:justify-between mb-10 lg:items-center">
                  <DashboardIntro introText="Order Management" />
                  <button
                    type="button"
                    className="bg-green text-white p-2 w-[140px] flex items-center rounded-md justify-center gap-1"
                    onClick={() => setCreateOrderForm(true)}
                  >
                    <FiPlus />
                    Create Order
                  </button>
                </article>
                {/* Cards */}
                <div className="flex gap-8 lg:gap-20">
                  <UseCardLoader
                    amount={2}
                    loading={isFetching}
                    error={isError}
                  >
                    <>
                      <DashboardBox
                        text="Total Orders"
                        data={orders?.length || 0}
                        spacing="my-5"
                        width="w-[50%]"
                      />
                      <DashboardBox
                        text="Total Complete Order"
                        data={0}
                        spacing="my-5"
                        width="w-[50%]"
                      />
                    </>
                  </UseCardLoader>
                </div>
                {/* filters */}
                <PageFilters
                  filters={["All", "Paid", "Unpaid"]}
                  searchPlaceholder="Search Order by ID..."
                  activeFilter={selectedFilter}
                  onFilterChange={handleActiveFilterChange}
                  handleSearch={handleSearch}
                  page="Orders"
                />
              </div>
              <div className="overflow-x-scroll lg:overflow-auto lg:max-w-[1100px] ">
                {isFetching ? (
                  <div className="grid">
                    <Skeleton className="w-full h-[40px] rounded-sm" />
                    <Skeleton className="w-full h-[40px] rounded-sm" />
                    <Skeleton className="w-full h-[40px] rounded-sm" />
                  </div>
                ) : (
                  <>
                    {noResults ? (
                      <p className=" text-center my-auto">No Items Found</p>
                    ) : (
                      <OrdersTable
                        data={filteredOrders}
                        isCollapsed={isCollapsed}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Orders;
