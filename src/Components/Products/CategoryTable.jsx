import { useState } from "react";
import EditCategory from "../PopupModals/EditCategory";
import DeleteCategory from "../PopupModals/DeleteCategory";
import Skeleton from "react-loading-skeleton";
import { useFetchCategories } from "../../datahooks/products/productshooks";
import { Link } from "react-router-dom";
const CategoryTable = () => {
  const { categories, isFetchingCategories, isError } = useFetchCategories();
  //removed the new element i was adding to the end of the array causing the bug
  return (
    <>
      <section className="mt-2 max-w-[800px] mx-auto">
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
                  {categories?.map((category, i) => {
                console.log(category);
                
                return (
                  <tr className="mt-4 bg-white shadow-md" key={category.id}>
                    <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                      {category?.name}
                    </td>
                    <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                      {category?.description || "NA"}
                    </td>
                    <td className="bg-white p-2 text-[#6e6e6e] font-semibold  ">
                      {category?.products?.length || 0}
                      <Link to={`/categories/${i}`}>
                        <button
                          className="text-lightGreen font-semibold capitalize"
                          disabled={category?.products?.length === 0}
                        >
                          View
                        </button>
                      </Link>
                    </td>
                    <td className="bg-white p-2 flex text-[#6e6e6e]  items-center gap-1 font-semibold capitalize">
                      <EditCategory  />
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
    </>
  );
};

export default CategoryTable;
