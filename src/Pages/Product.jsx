import { useState } from "react";
import Links from "../Links";
import {
  notification,
  timer,
  packagemoving2,
  deliveryview,
  packagemoving,
  packageoutofstock,
} from "../assets";
import ProductTable from "../Components/Products/ProductTable";
import AddProduct1 from "../Components/PopupModals/AddProduct1";
import { useFetchProducts } from "../datahooks/products/productshooks";
import Skeleton from "react-loading-skeleton";
import { useFetchUser } from "../datahooks/users/userhooks";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
const Product = () => {
  //get profile image from the user
  const { user } = useFetchUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, isFetching, isError } = useFetchProducts();
  const closeSidebar = () => {
    if (sidebarOpen) setSidebarOpen(false);
  };
  return (
    <>
      <div className="bg-[#F5F5F5] pb-20">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />

          {/* Navbar */}
          <div className="flex-grow lg:ml-56 overflow-x-hidden">
            <Navbar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              title="Products"
              icon={packagemoving}
              profilePic={user && user.image ? user.image : ""}
            />

            {/* Cards */}
            <div className="mt-28 mb-6 px-32">
              {isFetching ? (
                <div className=" grid grid-cols-3 gap-20">
                  {" "}
                  <Skeleton className=" w-[300px] h-[150px] rounded-sm" />{" "}
                  <Skeleton className=" w-[300px] h-[150px] rounded-sm" />{" "}
                  {/* <Skeleton className=" w-[300px] h-[150px] rounded-sm" />{" "} */}
                </div>
              ) : (
                <div className="flex gap-20">
                  <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                    <img src={packagemoving} alt="" />
                    <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                      {data?.length || "0"}
                    </h1>
                    <p className="text-[#6E6E6E]">Total Products</p>
                  </div>
                  <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                    <img src={deliveryview} alt="" />
                    <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                      0
                    </h1>
                    <p className="text-[#6E6E6E]">Total Products View</p>
                  </div>
                  {/* <div className="bg-[#FFFFFF] border-2 shadow-sm w-[273px] p-5 rounded-md">
                    <img src={timer} alt="" />
                    <h1 className="text-[#333333] text-[22px] font-bold mt-1">
                      0
                    </h1>
                    <p className="text-[#6E6E6E]">Average View Per Hour</p>
                  </div> */}
                </div>
              )}
            </div>
            {/* Add Product & Export CSV Button */}
            <div className="flex ml-32 items-center gap-24">
              <AddProduct1 />
              {/* <h1 className="text-[#ffffff] flex font-bold gap-1 items-center bg-[#004324] p-2.5 rounded-md">
          <img src={download} alt="" />
          Export CSV
        </h1> */}
            </div>
            {data && data.length === 0 && (
              <div className="px-24 mt-28">
                <div>
                  <img
                    src={packageoutofstock}
                    alt=""
                    className="flex justify-center mx-auto"
                  />
                  <h1 className="text-[24px] font-extrabold text-center">
                    You Have No Product Yet
                  </h1>
                  <p className="text-[#6E6E6E] font-bold text-center">
                    First up;Add your products Dear <br /> Merchants in order to
                    start making <br /> sales
                  </p>
                </div>
                <div className="flex justify-center mt-3">
                  <AddProduct1 />
                </div>
              </div>
            )}

            <div>
              <ProductTable
                data={data}
                isFetching={isFetching}
                isError={isError}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
