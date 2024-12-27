import { useState } from "react";
import { deliveryview, packagemoving, packageoutofstock } from "../assets";
import ProductTable from "../Components/Products/ProductTable";
import AddProduct1 from "../Components/PopupModals/AddProduct1";
import { useFetchProducts } from "../datahooks/products/productshooks";
import Skeleton from "react-loading-skeleton";
import { useFetchUser } from "../datahooks/users/userhooks";
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidebar/Sidebar";
import CategoryTable from "../Components/Products/CategoryTable";
import AddCategory from "../Components/PopupModals/AddCategory";
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import DashboardBox from "@/Components/Dashboard/DashboardBox";
const Product = () => {
  const { user } = useFetchUser();
  const {isCollapsed } = useSidebarStore();
  const [isActiveTab, setIsActiveTab] = useState(true);
  const { data, isFetching, isError } = useFetchProducts();
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  //category update
  return (
    <div className="bg-[#F5F5F5] pb-20">
      <div className="flex">
        <Sidebar  />
        <div className={`flex-grow ${isCollapsed?'lg:ml-20':'lg:ml-56'} overflow-x-hidden`}>
          <Navbar
            title="Products"
            icon={packagemoving}
            profilePic={user && user.image ? user.image : ""}
          />
          <div className={`mt-28 mb-6 ${isCollapsed?'max-w-[1000px]':'max-w-[800px]'}   mx-auto`}>
            {isFetching ? (
              <div className="grid grid-cols-3 gap-20">
                <Skeleton className="w-[300px] h-[150px] rounded-sm" />
                <Skeleton className="w-[300px] h-[150px] rounded-sm" />
              </div>
            ) : (
              <div className="flex gap-20">
                  <DashboardBox text='Total Products' imgWidth='w-9' image={packagemoving} bgColor='bg-[#FCDADF]' data={data?.length || 0} width='w-[50%]'/>
                  <DashboardBox text='Total Products View' imgWidth='w-8' image={ deliveryview} bgColor='bg-[#FFE8DF]' data={0} width='w-[50%]' />
              </div>
            )}
          </div>
          <div className={`flex justify-between ${isCollapsed?"lg:max-w-[1000px]":'lg:max-w-[800px]'} mx-auto h-[48px]`}>
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
                className="bg-green text-white font-bold p-inherit flex items-center w-[150px] rounded-md px-2"
                onClick={() => setCategoryOpen(true)}
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
                Add Category
              </button>
            )}
          </div>
          {data && data.length < 1 && (
            <div className="px-24 mt-28">
              <div>
                <img
                  src={packageoutofstock}
                  alt="icon to show you that there no products yet"
                  className="flex justify-center mx-auto"
                />
                <h1 className="text-[24px] font-extrabold text-center">
                  You Have No Product Yet
                </h1>
                <p className="text-[#6E6E6E] font-bold text-center">
                  First up:Add your products Dear <br /> Merchants in order to
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
            <CategoryTable />
          )}
          {isCategoryOpen && <AddCategory setCategoryOpen={setCategoryOpen} />}
        </div>
      </div>
    </div>
  );
};

export default Product;
