/* eslint-disable no-unused-vars */
import DashoardTabel from "../Components/Dashboard/DashoardTabel";
import {
  useFetchDashboardData,
  useFetchStoreCustomers,
  useFetchUser,
} from "../datahooks/users/userhooks";
import { Link } from "react-router-dom";
import { formatNumber } from "../utils/formatNumber";
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import DashboardBox from "@/Components/Dashboard/DashboardBox";
import { useFetchProducts } from "@/datahooks/products/productshooks";
import { UseCardLoader } from "@/Components/CustomLoaders/loaders";
import { useFetchExpense } from "@/datahooks/users/expensehook";
import AddProduct1 from "../Components/PopupModals/AddProduct1";
import DashboardIntro from "../Components/Dashboard/DashboardIntro";
import { useTransferStore } from '../ZustandStores/transferStore'
import TransferInventory from "@/Components/PopupModals/TransferInventory";
import { useFetchStoreSettings } from "@/datahooks/users/storeSettings";
import { convertNairaToDollar} from '../utils/formatNumber'
const Dashboard = () => {
  //users image
  const { user } = useFetchUser();
  const { totalExpense } = useFetchExpense();
  const { dashboardData, isFetchingDashboardData, dashboardDataisError } =
    useFetchDashboardData();
  const { customerLength } = useFetchStoreCustomers();
  const { productLength } = useFetchProducts();
  const { isCollapsed } = useSidebarStore();
  const { data: storeData } = useFetchStoreSettings()
  console.log(storeData);
  
  const {isTransferOpen, setOpenTransfer} = useTransferStore()
  //username
  const userName =
    user && user.name ? user.name.split(" ")[0].toUpperCase() : "";
  const dashboardRevenue =
    dashboardData?.salesData?.totalSales > totalExpense
      ? dashboardData?.salesData?.totalSales - totalExpense
      : 0;
  return (
    <>
      <div
        className={`mt-[70px]
          ${
            isCollapsed
              ? "  lg:ml-20 overflow-x-hidden"
              : "  lg:ml-56 overflow-x-hidden "
          }
        `}
      >
        <div className="lg:overflow-x-hidden">
          <UseCardLoader
            amount={4}
            className={`mt-20 lg:mt-1 mb-6 mx-auto  ${
              isCollapsed ? "lg:max-w-[1120px]" : "lg:max-w-[950px]"
            }`}
            loading={isFetchingDashboardData}
            error={dashboardDataisError}>
            <div
              className={`mb-6 ${
                isCollapsed ? "lg:max-w-[1120px]" : "lg:max-w-[950px]"
              } mx-auto`}
            >
              {/* welcome message */}
              <article className="flex justify-between flex-col gap-4 lg:gap-0 lg:flex-row">
                <DashboardIntro
                  introText={`Welcome ${userName}`}
                  overview="Here's an overview of your inventory system"
                />
                <div className="flex items-center gap-1">
                  <Link to='/product'>
                    <AddProduct1 />
                  </Link>
                  <button
                    type="button"
                    className="border-2 border-green p-[6px] rounded-md text-green"
                    onClick={()=>setOpenTransfer(true)}
                  >
                    Transfer inventory
                  </button>
                </div>
              </article>
              <div className="grid gap-x-2 gap-y-3 grid-cols-2 md:grid-cols-4 mt-10">
                {/* Cards */}
                <div className="relative">
                  <DashboardBox
                    text="Available Balance"
                    naira={storeData?.currency==='Naira'? '₦' : '$'}
                    spacing="my-6"
                    data={storeData?.currency==='Naira'?formatNumber(dashboardRevenue):formatNumber(convertNairaToDollar(dashboardRevenue))}
                  />
                </div>
                <DashboardBox
                  text="Total Sales"
                  naira={storeData?.currency==='Naira'? '₦' : '$'}
                  spacing="my-6"
                  data={storeData?.currency==='Naira'?formatNumber(dashboardData?.salesData?.totalSales):formatNumber(convertNairaToDollar(dashboardData?.salesData?.totalSales))||0}
                  
                />
                <DashboardBox
                  text="Total Payouts"
                  spacing="my-6"
                  data={totalExpense}
                />

                {/* <DashboardBox
                  text="Total Orders"
                  image={totalOrders}
                  bgColor="bg-[#F3D1FF]"
                  data={dashboardData?.orders?.totalOrders}
                /> */}

                <DashboardBox
                  text="Total Customers"
                  spacing="my-6"
                  data={customerLength}
                />
              </div>
            </div>
          </UseCardLoader>

          {/* Line */}
          {/* <div
            className={`${
              isCollapsed ? "lg:max-w-[1000px]" : "lg:max-w-[860px]"
            } mx-auto px-2  `}>
            <div className="border-2 border-white shadow-[0px_4px_10px_rgba(0,0,0,0.3)]"></div>
          </div> */}

          {/* <div className="px-36 mt-10 space-y-7">
              <div className="flex items-center justify-between">
                <Link to="/store">
                  <div className="flex items-center justify-between w-[469px] h-[122px] border-[#8ED06C] border-2 bg-[#ffffff] p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <img src={store} alt="" />
                      <div>
                        <h1>Setup Your Store</h1>
                        <p className="text-[#6E6E6E]">
                          Complete the informations and get your store up and
                          running
                        </p>
                      </div>
                    </div>
                    <img src={arrow} alt="" />
                  </div>
                </Link>

                <Link to="/product">
                  <div className="flex items-center justify-between w-[469px] h-[122px] border-[#8ED06C] border-2 bg-[#ffffff] p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <img src={packagemoving1} alt="" />
                      <div>
                        <h1>Post Your First Product</h1>
                        <p className="text-[#6E6E6E]">
                          Show your customers what you are here to offer and how
                          you can help them
                        </p>
                      </div>
                    </div>
                    <img src={arrow} alt="" />
                  </div>
                </Link>
              </div>

              <div className="flex items-center justify-between">
                <Link to="/shippingsetting">
                  <div className="flex items-center justify-between w-[469px] h-[122px] border-[#8ED06C] border-2 bg-[#ffffff] p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <img src={truck} alt="" />
                      <div>
                        <h1>Add Your Shipping Methods</h1>
                        <p className="text-[#6E6E6E]">
                          Complete your shipping informations and start shipping
                          your product safely
                        </p>
                      </div>
                    </div>
                    <img src={arrow} alt="" />
                  </div>
                </Link>

                <Link to="/paymentsetting">
                  <div className="flex items-center justify-between w-[469px] h-[122px] border-[#8ED06C] border-2 bg-[#ffffff] p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <img src={dollar} alt="" />
                      <div>
                        <h1>Setup Your Checkout</h1>
                        <p className="text-[#6E6E6E]">
                          Set how your customers pay for your product while
                          checking out
                        </p>
                      </div>
                    </div>
                    <img src={arrow} alt="" />
                  </div>
                </Link>
              </div>

              <div className="flex justify-center">
                <Link to="/banksetting">
                  <div className="flex items-center justify-between w-[469px] h-[122px] border-[#8ED06C] border-2 bg-[#ffffff] p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <img src={bank} alt="" />
                      <div>
                        <h1>Add Your Bank Details</h1>
                        <p className="text-[#6E6E6E]">
                          Input your correct bank details in order for you start
                          receiving your money
                        </p>
                      </div>
                    </div>
                    <img src={arrow} alt="" />
                  </div>
                </Link>
              </div>
            </div> */}
          {/* { policyOpen&&<Policy/>} */}
          <div>
            <DashoardTabel
              dashboardData={dashboardData}
              isFetchingDashboardData={isFetchingDashboardData}
              isCollapsed={isCollapsed}
            />
          </div>
        </div>
      </div>
      <TransferInventory setOpenTransfer={setOpenTransfer} isTransferOpen={isTransferOpen} />
    </>
  );
};

export default Dashboard;
