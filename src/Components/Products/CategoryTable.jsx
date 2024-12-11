import { useState } from "react";
import EditCategory from "../PopupModals/EditCategory";
import DeleteCategory from "../PopupModals/DeleteCategory";
import Skeleton from "react-loading-skeleton";
import { useFetchCategories } from "../../datahooks/products/productshooks";
import { Link } from "react-router-dom";
const CategoryTable = ({newCategory}) => {
  const { categories, isFetchingCategories, isError } = useFetchCategories();
  //if there's no new array of categories use the former category else add the new category to the array and map over that one instead(i dont knw why its not working tho)
  const displayedCategories = newCategory ? [ ...categories, newCategory] : categories;
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
      ) : 
          
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
          {displayedCategories?.map((item) => {
            return (
              <tr className="mt-4" key={item.id}>
                <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize lex items-center gap-2 justify-center">
                  {item?.name}
                </td>
                <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                  {item?.description|| 'xxxxxxxx'}
                </td>
                <td className="bg-white p-2 text-[#6e6e6e] font-semibold  ">
                  {item?.products?.length||0}
                  <button className="text-lightGreen font-semibold capitalize">
                    <Link to='/categories'>View</Link>
                  </button>
                </td>
                <td className="bg-white p-2 flex text-[#6e6e6e]  items-center gap-1 font-semibold capitalize">
                  <EditCategory  />
                  <DeleteCategory  /> 
                 </td>
                {/* <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                    </td> */}
              </tr>
            );
          })}
        </tbody>
        </table>
      }
    </section>
      
    </>

  );
};


export default CategoryTable;
