/* eslint-disable react/prop-types */
import { useState } from "react";
import { download, preference1 } from "../../assets";
import EditProduct from "../PopupModals/EditProduct";
import DeleteProduct from "../PopupModals/DeleteProduct";
// import AddProduct from "../PopupModals/AddProduct";
import Skeleton from "react-loading-skeleton";

// code start
const ProductTable = ({ data, isFetching, isError }) => {
  console.log(data);
  // const arrOfCategory = [...new Set(data?.map((item) => {
  //   console.log(item.name);
  //   console.log(typeof(data?.[0].category));
  //   return item.name
  // }))]
  // console.log(arrOfCategory);
  
  
  return (
    <>
      {/* Table */}
      <div className="max-w-[800px] mx-auto">
        {isFetching ? (
          <div className="bg-[#ffffff] w-full shadow-md">
            <Skeleton className=" w-full h-10" />
            <Skeleton className=" w-full  h-10" />
            <Skeleton className=" w-full h-10" />
          </div>
        ) : isError ? (
          "An error occurred"
        ) : (
          <table className=" w-full border-separate border-spacing-y-5">
            <thead>
              <tr className="text-left bg-[#EAF4E2] shadow-lg">
                <th className="lg:p-2 text-center">Product ID</th>
                <th className="lg:p-2  text-center">Product Name</th>
                <th className="lg:p-2  text-center">Category</th>
                <th className="lg:p-2  text-center">Price</th>
                <th className="lg:p-2  text-center">Unit Sold</th>
                <th className="lg:p-2 text-center">Stock Level</th>
                <th className="lg:p-2 text-center">Actions</th>
                {/* <th className="px-2 py-3 text-center flex items-center gap-1 justify-center">
                  Bulk Action
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26 7.33398L25.1737 20.7008C24.9625 24.1159 24.8571 25.8235 24.0011 27.0512C23.5777 27.6581 23.0329 28.1704 22.4009 28.5553C21.1228 29.334 19.412 29.334 15.9903 29.334C12.5642 29.334 10.8511 29.334 9.57207 28.5539C8.93973 28.1683 8.39467 27.6551 7.97157 27.0471C7.11584 25.8175 7.0126 24.1075 6.80615 20.6876L6 7.33398"
                      stroke="#8ED06C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M12 15.6465H20"
                      stroke="#8ED06C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14 20.873H18"
                      stroke="#8ED06C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 7.33268H28M21.4073 7.33268L20.4972 5.45499C19.8925 4.2077 19.5901 3.58404 19.0687 3.1951C18.9531 3.10882 18.8305 3.03207 18.7024 2.96562C18.1249 2.66602 17.4319 2.66602 16.0457 2.66602C14.6248 2.66602 13.9144 2.66602 13.3273 2.97818C13.1972 3.04736 13.0731 3.12722 12.9561 3.21691C12.4286 3.62162 12.1339 4.26808 11.5446 5.56103L10.737 7.33268"
                      stroke="#8ED06C"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </th> */}
              </tr>
            </thead>

            <tbody>
              {data?.map((product) => (
                <tr key={product.id} className="bg-[#ffffff] shadow-md">
                  <td className="lg:p-2 px-2 text-center">{product.id}</td>
                  <td className="lg:p-2 px-2 text-center capitalize">
                    {product.name}
                  </td>
                  <td className="lg:p-2 px-2  text-center capitalize">
                    {product.category.name}
                  </td>
                  <td className="lg:p-2 px-2 text-center">{product.price}</td>
                  <td className="lg:p-2 px-2  text-center">
                    {product.unitsSold}
                  </td>
                  <td className="lg:p-2 px-2  text-center">{product.stock}</td>
                  <td className="lg:p-2 px-2 text-center flex items-center gap-2 justify-center ">
                    <EditProduct product={product} />
                    <DeleteProduct product={product} />
                  </td>
                  {/* <td className="px-2 py-3 text-center">
                    <input
                      type="checkbox"
                      id={`product-${product.id}`}
                      name={`product-${product.id}`}
                      className="size-5 rounded-md bg-white shadow-sm"
                    />
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/*Pagination*/}
      <div>
        <ol className="flex justify-center gap-3 text-xs font-medium mt-3">
          <li>
            <a
              href="#"
              className="inline-flex size-8 items-center justify-center rounded border border-gray-300 bg-white hover:bg-[#8ED06C] text-gray-900 hover:text-[#E2E8F0] rtl:rotate-180"
            >
              <span className="sr-only">Prev Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block size-8 rounded border border-[#8ED06C] bg-white text-center leading-8 text-[#8ED06C]"
            >
              1
            </a>
          </li>

          <li className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900">
            2
          </li>

          <li>
            <a
              href="#"
              className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900"
            >
              ...
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900"
            >
              9
            </a>
          </li>

          <li>
            <a
              href="#"
              className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900"
            >
              10
            </a>
          </li>

          <li>
            <a
              href="#"
              className="inline-flex size-8 items-center justify-center rounded border border-gray-300 bg-white hover:bg-[#8ED06C] text-gray-900 hover:text-[#E2E8F0] rtl:rotate-180"
            >
              <span className="sr-only">Next Page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </li>
        </ol>
      </div>
    </>
  );
};

export default ProductTable;
