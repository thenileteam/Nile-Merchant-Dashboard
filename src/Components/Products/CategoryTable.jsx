import { useState } from "react";
import EditCategory from "../PopupModals/EditCategory";
import DeleteCategory from "../PopupModals/DeleteCategory";
import Skeleton from "react-loading-skeleton";
import { useFetchCategories } from "../../datahooks/products/productshooks";
import { Link } from "react-router-dom";
import usePagination from '../Pagination/PaginationHook'
import Pagination from "../Pagination/Pagination";
import { useUserStore } from "@/zustandStore";
const CategoryTable = () => {
  const { categories, isFetchingCategories, isError } = useFetchCategories();
  const{isCollapsed} = useUserStore()
  const itemsPerPage = 10
   const {pageCount, currentItems, handlePageChange}= usePagination(categories, itemsPerPage)
  return (
    <>
      <section className={`mt-2 ${isCollapsed?'max-w-[1000px]':'max-w-[800px]'}  mx-auto`}>
        {isFetchingCategories ? (
          <div className="bg-[#ffffff] w-full shadow-md">
            <Skeleton className=" w-full h-10" />
            <Skeleton className=" w-full  h-10" />
            <Skeleton className=" w-full h-10" />
          </div>
        ) : isError ? (
          "An error occurred"
        ) : (
          <table className="w-full border-separate border-spacing-y-5">
            <thead>
              <tr className="text-left bg-[#EAF4E2]">
                <th className=" p-2 shadow-lg">Category </th>
                <th className=" p-2 shadow-lg">Descriptions</th>
                <th className=" p-2 shadow-lg">Products</th>
                <th className=" p-2 shadow-lg">Actions</th>
                {/* <th className=" p-2 shadow-lg">Bulk Actions</th> */}
              </tr>
            </thead>
            <tbody>
                  {currentItems?.map((category, i) => {
                return (
                  <tr className="mt-4 bg-white shadow-md" key={category.id}>
                    <td className="bg-white p-2 text-[#6e6e6e] capitalize">
                      {category?.name}
                    </td>
                    <td className="bg-white p-2 text-[#6e6e6e]  capitalize">
                      {category?.description || "NA"}
                    </td>
                    <td className="bg-white p-2 text-[#6e6e6e]  ">
                      {category?.products?.length || 0}
                      <Link to={`/categories/${i}`}>
                        <button
                          className="text-lightGreen capitalize"
                          disabled={category?.products?.length === 0}
                        >
                          View
                        </button>
                      </Link>
                    </td>
                    <td className="bg-white p-2 flex text-[#6e6e6e]  items-center gap-1 capitalize">
                      <EditCategory category={category} />
                      <DeleteCategory category={category}/>
                    </td>
                    {/* <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                    </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
      {/* pagination */}
      {categories?.length > itemsPerPage && (
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      )}
    </>
  );
};

export default CategoryTable;
