import React from "react";
import { Link } from "react-router-dom";
import { download } from "../../assets";

const DashoardTabel = () => {
  return (
    <>

      {/* Tables */}
      <div className="px-24">
        <table className=" w-full border-separate border-spacing-y-5">
          <thead>
            <tr className="text-left bg-[#EAF4E2] shadow-lg">
              <th className="px-2 py-3">Metrics</th>
              <th className="px-2 py-3 text-center">Today</th>
              <th className="px-2 py-3 text-center">This week</th>
              <th className="px-2 py-3 text-center">This Month</th>
              <th className="px-2 py-3 text-center">This Year So Far</th>
              <th className="px-2 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Row 1 */}
            <tr className="bg-[#ffffff] shadow-md">
              <td className="px-2 py-3 bg-[#EAF4E2]">Your Orders</td>
              <td className="px-2 py-3 text-center">35</td>
              <td className="px-2 py-3 text-center">210</td>
              <td className="px-2 py-3 text-center">980</td>
              <td className="px-2 py-3 text-center">6750</td>
              <td className="px-2 py-3 text-center bg-[#F5F5F5] text-[#8ED06C] font-extrabold">
                <Link
                  to="#"
                  className="hover:border-[#8ED06C] border-[#f5f5f5] border-b-2 transition duration-300 underline-offset-4 decoration-[2px] inline-block hover:-translate-x-1"
                >
                  View Orders
                </Link>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="bg-[#ffffff] shadow-md">
              <td className="px-2 py-3 bg-[#EAF4E2]">Best-selling Products</td>
              <td className="px-2 py-3 text-center">Sneakers</td>
              <td className="px-2 py-3 text-center">150 Units</td>
              <td className="px-2 py-3 text-center">$65000</td>
              <td className="px-2 py-3 text-center">3200 Units</td>
              <td className="px-2 py-3 text-center bg-[#F5F5F5] text-[#8ED06C] font-extrabold">
                <Link
                  to="#"
                  className="hover:border-[#8ED06C] border-[#f5f5f5] border-b-2 transition duration-300 underline-offset-4 decoration-[2px] inline-block hover:-translate-x-1"
                >
                  View
                </Link>
              </td>
            </tr>

            {/* Row 3 */}
            <tr className="bg-[#ffffff] shadow-md">
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
            </tr>
          </tbody>
        </table>
      </div>

      {/* Export CSV Button */}
      <div className=" flex px-28 justify-end mt-10">
        <h1 className="text-[#ffffff] flex font-bold gap-1 items-center bg-[#004324] p-2.5 rounded-md">
          <img src={download} alt="" />
          Export CSV
        </h1>
      </div>
    </>
  );
};

export default DashoardTabel;
