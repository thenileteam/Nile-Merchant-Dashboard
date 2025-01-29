/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { download } from "../../assets";
import Skeleton from "react-loading-skeleton";
import {formatNumber} from '../../utils/formatNumber'
const DashoardTabel = ({ isFetchingDashboardData, dashboardData, isCollapsed }) => {
  // const { orders, product, salesData } = dashboardData;
  // console.log(dashboardData);
  return (
    <>
      <div className={`${isCollapsed?'lg:max-w-[1000px]':"lg:max-w-[860px]"} mx-auto px-2 lg:px-0`}>
        {isFetchingDashboardData ? (
          <div className=" w-full mt-10 flex flex-col gap-5">
            <Skeleton className=" h-[50px] w-full min-w-52" />
            <Skeleton className=" h-[50px] w-full min-w-52" />
            <Skeleton className=" h-[50px] w-full min-w-52" />
          </div>
        ) : (
          <table className="w-full border-separate border-spacing-y-5  ">
            <thead  >
              <tr className="text-left bg-[#EAF4E2] shadow-lg">
                <th className=" py-3">Metrics</th>
                <th className=" py-3 text-center">Today</th>
                <th className=" py-3 text-center">This week</th>
                <th className=" py-3 text-center">This Month</th>
                <th className=" py-3 text-center">This Year So Far</th>
                <th className=" py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="">
              {/* Row 1 */}
              <tr className="bg-[#ffffff] shadow-md  ">
                <td className="lg:p-3 p-2 bg-[#EAF4E2]">Your Orders</td>
                <td className="lg:p-3 p-2 text-center">
                  {dashboardData?.orders?.today.length || 0}
                </td>
                <td className="lg:p-3 p-2 text-center">
                  {dashboardData?.orders?.week?.length}
                </td>
                <td className="lg:p-3 p-2 text-center">
                  {dashboardData?.orders?.month?.length}
                </td>
                <td className="lg:p-3 p-2 text-center">
                  {" "}
                  {dashboardData?.orders?.year?.length}
                </td>
                <td className="lg:p-3 p-2 text-center bg-[#F5F5F5] text-[#8ED06C] font-extrabold">
                  <Link
                    to="/orders"
                    className="hover:border-[#8ED06C] border-[#f5f5f5] border-b-2 transition duration-300 underline-offset-4 decoration-[2px] inline-block hover:-translate-x-1"
                  >
                    View Orders
                  </Link>
                </td>
              </tr>

              {/* Row 2 */}
              <tr className="bg-[#ffffff] shadow-md">
                <td className="lg:p-3 p-2 bg-[#EAF4E2]">
                  Best-selling Products
                </td>
                <td className="lg:p-3 p-2 text-center">
                  {" "}
                  {dashboardData?.product?.name}
                </td>
                <td className="lg:p-3 p-2 text-center">
                  {dashboardData?.salesData?.quantitySoldThisWeek} Units
                </td>
                <td className="lg:p-3 p-2 text-center">
                  &#8358;{formatNumber(dashboardData?.salesData?.totalSalesThisMonth)}
                </td>
                <td className="lg:p-3 p-2  text-center">
                  {dashboardData?.salesData?.totalUnitsSoldThisYear} Units
                </td>
                <td className="lg:p-3 p-2  text-center bg-[#F5F5F5] text-[#8ED06C] font-extrabold">
                  <Link
                    to="/orders"
                    className="hover:border-[#8ED06C] border-[#f5f5f5] border-b-2 transition duration-300 underline-offset-4 decoration-[2px] inline-block hover:-translate-x-1"
                  >
                    View
                  </Link>
                </td>
              </tr>

              {/* Row 3 */}
              {/* <tr className="bg-[#ffffff] shadow-md">
                <td className="px-2 py-3 bg-[#EAF4E2]">Your Reviews</td>
                <td className="px-2 py-3 text-center">35</td>
                <td className="px-2 py-3 text-center">210</td>
                <td className="px-2 py-3 text-center">980</td>
                <td className="px-2 py-3 text-center">6750</td>
                <td className="px-2 py-3 text-center bg-[#F5F5F5] text-[#8ED06C] font-extrabold">
                  <Link
                    to="#"
                    className="hover:border-[#8ED06C] border-[#f5f5f5] border-b-2 transition duration-300 underline-offset-4 decoration-[2px] inline-block hover:-translate-x-1"
                  >
                    View
                  </Link>
                </td>
              </tr> */}
            </tbody>
          </table>
        )}
      </div>{" "}
      {/* Tables */}
      {/* Export CSV Button */}
      {/* <div className=" flex px-28 justify-end mt-10">
        <h1 className="text-[#ffffff] flex font-bold gap-1 items-center bg-[#004324] p-2.5 rounded-md">
          <img src={download} alt="" />
          Export CSV
        </h1>
      </div> */}
    </>
  );
};

export default DashoardTabel;
