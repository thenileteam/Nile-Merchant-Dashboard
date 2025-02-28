/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { download } from "../../assets";
import Skeleton from "react-loading-skeleton";
import { formatNumber, convertNairaToDollar } from "../../utils/formatNumber";
import { FaEye } from "react-icons/fa";
import { useFetchStoreSettings } from "@/datahooks/users/storeSettings";
const DashoardTabel = ({
  isFetchingDashboardData,
  dashboardData,
  isCollapsed,
}) => {
  // const { orders, product, salesData } = dashboardData;
  // console.log(dashboardData);
  const {data:storeData} = useFetchStoreSettings()
  return (
    <>
      <div
        className={`${
          isCollapsed ? "lg:max-w-[1140px]" : "lg:max-w-[940px]"
        } mx-auto p-2 lg:p-4 bg-white shadow-md rounded-md border-[0.5px] text-lightBlack`}>
        <p>Updates</p>
        {isFetchingDashboardData ? (
          <div className=" w-full mt-10 flex flex-col gap-5">
            <Skeleton className=" h-[50px] w-full min-w-52" />
            <Skeleton className=" h-[50px] w-full min-w-52" />
            <Skeleton className=" h-[50px] w-full min-w-52" />
          </div>
        ) : (
          <div className="overflow-x-scroll lg:overflow-auto  ">
            <table className="w-full border-separate border-spacing-y-4  ">
              <thead >
                <tr className="text-left bg-[#EAF4E2] shadow-lg  rounded-md">
                  <th className=" p-3 ">Metrics</th>
                  <th className=" p-3  text-center">Today</th>
                  <th className=" p-3  text-center">This week</th>
                  <th className=" p-3  text-center">This Month</th>
                  <th className=" p-3  text-center">This Year So Far</th>
                  <th className=" p-3  text-center">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {/* Row 1 */}
                <tr className="bg-[#ffffff] shadow-md  rounded-md">
                  <td className="lg:p-3 p-2 bg-[#EAF4E2] font-bold ">Your Orders</td>
                  <td className="lg:p-3 p-2 text-center font-light text-[#6e6e6e]">
                    {dashboardData?.orders?.today.length || 0}
                  </td>
                  <td className="lg:p-3 p-2 text-center font-light text-[#6e6e6e]">
                    {dashboardData?.orders?.week?.length}
                  </td>
                  <td className="lg:p-3 p-2 text-center font-light text-[#6e6e6e]">
                    {dashboardData?.orders?.month?.length}
                  </td>
                  <td className="lg:p-3 p-2 text-center font-light text-[#6e6e6e]">
                    {" "}
                    {dashboardData?.orders?.year?.length}
                  </td>
                  <td className="lg:p-3 p-2 text-center bg-[#F5F5F5] text-[#8ED06C] font-extrabold">
                    <Link
                      to="/order"
                      className="hover:border-[#6e6e6e] border-[#f5f5f5] border-b-2 transition duration-300 underline-offset-4 decoration-[2px] inline-block hover:-translate-x-1"
                    >
                      <FaEye className="text-[#6e6e6e]"/>
                    </Link>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="bg-[#ffffff] shadow-md rounded-md">
                  <td className="lg:p-3 p-2  bg-[#EAF4E2] font-bold">
                    Best-selling Products
                  </td>
                  <td className="lg:p-3 p-2 text-center font-light">
                    {" "}
                    {dashboardData?.product?.name}
                  </td>
                  <td className="lg:p-3 p-2 text-center font-light">
                    {dashboardData?.salesData?.quantitySoldThisWeek || 0} Units
                  </td>
                  <td className="lg:p-3 p-2 text-center font-light">
                      <span>{storeData?.currency==='Naira'? '₦' : '$'}</span>
                    {storeData?.currency==='Naira'?formatNumber( dashboardData?.salesData?.totalSalesThisMonth): formatNumber(convertNairaToDollar(
                      dashboardData?.salesData?.totalSalesThisMonth)
                    ) || 0}
                  </td>
                  <td className="lg:p-3 p-2  text-center font-light">
                    {dashboardData?.salesData?.totalUnitsSoldThisYear || 0}{" "}
                    Units
                  </td>
                  <td className="lg:p-3 p-2  text-center bg-[#F5F5F5] text-[#8ED06C] font-extrabold">
                    <Link
                      to="/order"
                      className="hover:border-[#6e6e6e] border-[#f5f5f5] border-b-2 transition duration-300 underline-offset-4 decoration-[2px] inline-block hover:-translate-x-1"
                    >
                       <FaEye className="text-[#6e6e6e]"/>
                    </Link>
                  </td>
                </tr>

                {/* Row 3 */}
                {/* <tr className="bg-[#ffffff] shadow-md">
                <td className="px-2 py-3 bg-[#EAF4E2]">Your Reviews</td>
                <td className="px-2 py-3 </td>
                <td className="px-2 py-3 0</td>
                <td className="px-2 py-3 0</td>
                <td className="px-2 py-3 50</td>
                <td className="px-2 py-3 [#F5F5F5] text-[#8ED06C] font-extrabold">
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
          </div>
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
