import {
  useFetchLocations,
  useFetchSingleLocation,
} from "@/datahooks/location/useLocationhook";
import usePagination from "../Pagination/PaginationHook";
import AddProduct1 from "../PopupModals/AddProduct1";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import{Link} from 'react-router-dom'
const BranchTable = ({ isCollapsed, setOpenTransfer }) => {
  const { id } = useParams();
  const { locationProducts, isFetchingProductsInLocation, isError, isLoading } =
    useFetchSingleLocation(id);
  return (
    <section>
      <div
        className={`mt-5 ${
          isCollapsed ? "max-w-[1100px]" : "max-w-[950px]"
        } mx-auto`}
      >
        
        <div className="overflow-x-scroll lg:overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-5">
            <thead>
              <tr className="text-left bg-[#EAF4E2]">
                <th className=" p-2 shadow-lg">Product ID</th>
                <th className=" p-2 shadow-lg">Product Name</th>
                <th className=" p-2 shadow-lg">Product Category</th>
                <th className=" p-2 shadow-lg">Price</th>
                <th className=" p-2 shadow-lg">Unit Sold</th>
              </tr>
            </thead>
            <tbody>
              {isFetchingProductsInLocation && (
                <div className="w-full mt-5 border-2">
                  <Skeleton className=" h-[40px] w-full block" />
                  <Skeleton className=" h-[40px] w-full block" />
                  <Skeleton className=" h-[40px] w-full block" />
                </div>
              )}
              {locationProducts?.map((singleLoc) => {
                console.log(singleLoc)
                return (
                  <tr className="mt-4 bg-white shadow-md">
                    <td className="bg-[#EAF4E2] p-2 text-lightBlack font-bold  capitalize">
                      {String(singleLoc.id).padStart(4, 0) || "Admin"}
                    </td>
                    <td className="bg-white p-2 text-[#6e6e6e] capitalize">
                      {singleLoc.name || "xxxxx"}
                    </td>
                    <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                      {singleLoc.categoryName || "category"}
                    </td>
                    <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                      {singleLoc.price}
                    </td>
                    <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                      {singleLoc.unitSold}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* } */}
      </div>
    </section>
  );
};

export default BranchTable;
