/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import {
  store,
  totalExpenseImg,
  totalInventory,
  totalRevenue,
  totalCustomers,
  totalOrders,
  totalProfit,
} from "../assets";
// import Policy from '../Components/PopupModals/Policy'
import DashoardTabel from "../Components/Dashboard/DashoardTabel";
import {
  useFetchDashboardData,
  useFetchStoreCustomers,
  useFetchUser,
} from "../datahooks/users/userhooks";
import {formatNumber} from '../utils/formatNumber'
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import DashboardBox from "@/Components/Dashboard/DashboardBox";
import { useFetchProducts } from "@/datahooks/products/productshooks";
import DashboardLayout from "@/Components/Layouts/DashboardLayout";
import { UseCardLoader } from "@/Components/CustomLoaders/loaders";
import { useFetchExpense } from "@/datahooks/users/expensehook";
const Dashboard = () => {
  //users image
  const { user } = useFetchUser();
  const { totalExpense } = useFetchExpense();
  const { dashboardData, isFetchingDashboardData, dashboardDataisError } =
    useFetchDashboardData();
  const { customerLength } = useFetchStoreCustomers();
  const { productLength } = useFetchProducts();
  const { isCollapsed } = useSidebarStore();
  //username
  // const username =
  //   user && user.name ? user.name.split(" ")[0].toUpperCase() : "User";
  return (
    <>
      <DashboardLayout isCollapsed={isCollapsed}>
        <div className="bg-[#F5F5F5] h-screen pt-[112px] pb-20 lg:overflow-x-hidden">
          {/* Cards */}

          <UseCardLoader amount={6} className="mt-20 lg:mt-1 mb-6 px-2" loading={isFetchingDashboardData} error={dashboardDataisError}>
            <div
              className={`mt-20 lg:mt-1 mb-6 px-2 ${
                isCollapsed ? "lg:max-w-[1000px]" : "lg:max-w-[850px]"
              } mx-auto`}
            >
              <div className="grid gap-x-8 gap-y-4 grid-cols-2 md:grid-cols-3">
                <DashboardBox
                  text="Revenue"
                  naira="&#8358;"
                  image={totalRevenue}
                  bgColor="bg-[#FCDADF]"
                  data={`${formatNumber(dashboardData?.salesData?.totalSales)  || 0}`}
                />
                <div className="relative">
                   
                  <DashboardBox
                    text="Total Expenses"
                    image={totalExpenseImg}
                    bgColor="bg-[#FFE8DF]"
                    data={totalExpense}
                  />
                </div>
                <div className="relative">
                   
                  <DashboardBox
                    text="Total Profits"
                    image={totalProfit}
                    bgColor="bg-[#FFDBFA]"
                    data={totalRevenue>totalExpense?totalRevenue-totalExpense: 0}
                  />
                </div>
                <DashboardBox
                  text="Total Orders"
                  image={totalOrders}
                  bgColor="bg-[#F3D1FF]"
                  data={dashboardData?.orders?.totalOrders}
                />
                <DashboardBox
                  text="Total Inventory"
                  image={totalInventory}
                  bgColor="bg-[#E7FFD4]"
                  data={productLength}
                />
                <DashboardBox
                  text="Total Customers"
                  image={totalCustomers}
                  bgColor="bg-[#D8FFEE]"
                  data={customerLength}
                />
              </div>
            </div>
          </UseCardLoader>

          {/* Line */}
          <div
            className={`${
              isCollapsed ? "lg:max-w-[1000px]" : "lg:max-w-[860px]"
            } mx-auto px-2  `}
          >
            <div className="border-2 border-white shadow-[0px_4px_10px_rgba(0,0,0,0.3)]"></div>
          </div>

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
      </DashboardLayout>
    </>
  );
};

export default Dashboard;
