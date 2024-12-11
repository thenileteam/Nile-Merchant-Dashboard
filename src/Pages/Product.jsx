import { useState } from "react";
import {
  deliveryview,
  packagemoving,
  packageoutofstock,
} from "../assets";
import ProductTable from "../Components/Products/ProductTable";
import AddProduct1 from "../Components/PopupModals/AddProduct1";
import {useFetchProducts } from "../datahooks/products/productshooks";
import Skeleton from "react-loading-skeleton";
import { useFetchUser } from "../datahooks/users/userhooks";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import CategoryTable from "../Components/Products/CategoryTable";
import AddCategory from '../Components/PopupModals/AddCategory'
import { useUserStore } from "../zustandStore";
const Product = () => {
  const { user } = useFetchUser();
  const{sidebarOpen, setSidebarOpen, closeSidebar} = useUserStore()
  const [isActiveTab, setIsActiveTab] = useState(true);
  const { data, isFetching, isError } = useFetchProducts();
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  //category update
  const [newCategory, setNewCategory] = useState(null); 
  return (
    <div className="bg-[#F5F5F5] pb-20">
      <div className="flex">
        <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
        <div className="flex-grow lg:ml-56 overflow-x-hidden">
          <Navbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            title="Products"
            icon={packagemoving}
            profilePic={user && user.image ? user.image : ""}
          />
          <div className="mt-28 mb-6 max-w-[800px] mx-auto">
            {isFetching ? (
              <div className="grid grid-cols-3 gap-20">
                <Skeleton className="w-[300px] h-[150px] rounded-sm" />
                <Skeleton className="w-[300px] h-[150px] rounded-sm" />
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
              </div>
            )}
          </div>
          <div className="flex justify-between lg:max-w-[800px] mx-auto h-[48px]">
            <div className="flex gap-1">
              <button
                className={
                  isActiveTab
                    ? "bg-[#004324] text-white font-bold p-inherit block w-[100px] rounded-md"
                    : "w-[100px] rounded-md bg-white text-[#6e6e6e] font-bold"
                }
                onClick={() => setIsActiveTab(true)}
              >
                Products
              </button>
              <button
                className={
                  isActiveTab
                    ? "w-[100px] rounded-md bg-white text-[#6e6e6e] font-bold"
                    : "bg-[#004324] text-white font-bold p-inherit block w-[100px] rounded-md"
                }
                onClick={() => setIsActiveTab(false)}
              >
                Category
              </button>
            </div>
            {isActiveTab ? (
              <AddProduct1 />
            ) : (
              <button
                className="bg-green text-white font-bold p-inherit block w-[120px] rounded-md"
                onClick={() => setCategoryOpen(true)}
              >
                Add Category
              </button>
            )}
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
          {isActiveTab ? (
            <ProductTable
              data={data}
              isFetching={isFetching}
              isError={isError}
            />
          ) : (
            <CategoryTable newCategory={newCategory}
             
            />
          )}
          {isCategoryOpen && (
            <AddCategory
              setCategoryOpen={setCategoryOpen}
              setNewCategory={setNewCategory}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
