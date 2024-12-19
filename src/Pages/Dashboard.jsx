/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import {
  notification,
  store,
  arrow,
  packagemoving1,
  truck,
  dollar,
  bank,
  totalExpense,
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
import Skeleton from "react-loading-skeleton";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import { useUserStore } from "../zustandStore";
import DashboardBox from "@/Components/Dashboard/DashboardBox";
import { useFetchProducts } from "@/datahooks/products/productshooks";
const Dashboard = () => {
  //users image
  const { user } = useFetchUser();
  const { dashboardData, isFetchingDashboardData, dashboardDataisError } =
    useFetchDashboardData();
  const { customerLength } = useFetchStoreCustomers();
  const { productLength } = useFetchProducts();
  console.log(dashboardData);
  const { isCollapsed } = useUserStore();
  //username
  const username =
    user && user.name ? user.name.split(" ")[0].toUpperCase() : "User";
  return (
    <>
      <div className="bg-[#F5F5F5] pb-20 lg:overflow-x-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <Sidebar />
          {/* Navbar */}
          <div
            className={
              isCollapsed ? "flex-grow lg:ml-16" : "flex-grow lg:ml-56"
            }
          >
            <Navbar
              title={`Welcome ${username}`}
              profilePic={user && user.image ? user.image : ""}
            />

            {/* Cards */}
            {isFetchingDashboardData ? (
              <div className=" w-full mt-28 h-40 flex gap-8">
                <div className=" h-[150px] bg-zinc-200  w-[300px]" />
                <div className=" h-[150px] bg-zinc-200 w-[300px]" />
                <div className=" h-[150px] bg-zinc-200 w-[300px]" />
              </div>
            ) : (
              <div
                className={`mt-20 lg:mt-28 mb-6 px-2 ${
                  isCollapsed ? "lg:max-w-[1000px]" : "lg:max-w-[880px]"
                } mx-auto`}
              >
                <div className="grid gap-x-8 gap-y-4 grid-cols-2 lg:grid-cols-3">
                  <DashboardBox
                    text="Revenue"
                    image={totalRevenue}
                    bgColor="bg-[#FCDADF]"
                    data={dashboardData?.salesData?.totalSales || 0}
                  />
                    <div className="relative">
                      <span className="absolute top-2 right-3 font-medium text-[13px] capitalize">coming soon..</span>
                    <DashboardBox
                      text="Total Expenses"
                      image={totalExpense}
                      bgColor="bg-[#FFE8DF]"
                      data={"-"}
                      />
                    </div>
                    <div className="relative"> 
                    <span className="absolute right-3 top-2 font-medium text-[13px] capitalize">coming soon..</span>
                    <DashboardBox
                      text="Total Profits"
                      image={totalProfit}
                      bgColor="bg-[#FFDBFA]"
                      data={'-'}
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
            )}
            {/* Line */}
            <div
              className={`${
                isCollapsed ? "lg:max-w-[1000px]" : "lg:max-w-[860px]"
              } mx-auto px-2`}
            >
              <div className="border-2 border-white shadow-[0px_4px_10px_rgba(0,0,0,0.3)]"></div>
            </div>

            {/* <div className="px-36 mt-10 space-y-7">
              <div className="flex items-center justify-between">
                <Link to="/storesetting">
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
      </div>
    </>
  );
};

export default Dashboard;
