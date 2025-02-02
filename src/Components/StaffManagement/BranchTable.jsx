import { useFetchLocations,  useFetchSingleLocation  } from "@/datahooks/location/useLocationhook";
import usePagination from "../Pagination/PaginationHook";
import AddProduct1 from "../PopupModals/AddProduct1";
import { useParams } from "react-router-dom"
import Skeleton from "react-loading-skeleton";
const BranchTable = ({ isCollapsed, setOpenTransfer}) => {
  const { id } = useParams()
  const { locationProducts,
    isFetchingProductsInLocation,
    isError,
    isLoading, } = useFetchSingleLocation(id)
  return (
    <section>
      <div
        className={`mt-5 ${
          isCollapsed ? "max-w-[1000px]" : "max-w-[820px]"
        } mx-auto`}
      >
        <div className="flex gap-3">
          <AddProduct1 />
          <button
            className="bg-transparent border border-lightGreen text-lightGreen font-bold p-inherit flex items-center w-[185px] rounded-md p-2"
            onClick={()=>setOpenTransfer(true)}
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 8V16M16.5 12H8.5"
                stroke="currentcolor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 12C3 7.52166 3 5.28249 4.39124 3.89124C5.78249 2.5 8.02166 2.5 12.5 2.5C16.9783 2.5 19.2175 2.5 20.6088 3.89124C22 5.28249 22 7.52166 22 12C22 16.4783 22 18.7175 20.6088 20.1088C19.2175 21.5 16.9783 21.5 12.5 21.5C8.02166 21.5 5.78249 21.5 4.39124 20.1088C3 18.7175 3 16.4783 3 12Z"
                stroke="currentcolor"
                strokeWidth="1.5"
              />
            </svg>
            Transfer inventory
          </button>
        </div>

        <table className="w-full border-separate border-spacing-y-5">
          <thead>
            <tr className="text-left bg-[#EAF4E2]">
              <th className=" p-2 shadow-lg">ProductID</th>
              <th className=" p-2 shadow-lg">Product Name</th>
              <th className=" p-2 shadow-lg">Product Category</th>
              <th className=" p-2 shadow-lg">Price</th>
              <th className=" p-2 shadow-lg">Unit Sold</th>
            </tr>
          </thead>
          <tbody>
            {isFetchingProductsInLocation &&(
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
               <td className="bg-white p-2 text-[#6e6e6e]  capitalize">
                {singleLoc.id||"Admin"}
              </td>
              <td className="bg-white p-2 text-[#6e6e6e] capitalize">
                { singleLoc.name||"xxxxx"}
              </td>
              <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                {singleLoc.category|| "10:59pm"}
              </td>
              <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                {singleLoc.price}
              </td>
              <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                {singleLoc.unitSold}
              </td> 
            </tr>
             ) 
         })} 
          </tbody>
        </table>
        {/* } */}
      </div>
       
    </section>
  );
};

export default BranchTable;
