import { useState, useMemo } from "react";
import { packageoutofstock } from "../assets";
import ProductTable from "../Components/Products/ProductTable";
import AddProduct1 from "../Components/PopupModals/AddProduct1";
import {
  useFetchCategories,
  useFetchProducts,
} from "../datahooks/products/productshooks";
import Skeleton from "react-loading-skeleton";
import CategoryTable from "../Components/Products/CategoryTable";
import AddCategory from "../Components/PopupModals/AddCategory";
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import DashboardBox from "@/Components/Dashboard/DashboardBox";
import DashboardIntro from "@/Components/Dashboard/DashboardIntro";
import { FiPlus } from "react-icons/fi";
import {
  useProductStore,
  useEditProductStore,
} from "../ZustandStores/transferStore";
import EditProduct from "@/Components/PopupModals/EditProduct";
import { motion, AnimatePresence } from "framer-motion";
import { UserTableListLoader } from "@/Components/CustomLoaders/loaders";
import PageFilters from "@/Components/PageFilters/PageFilter";
import { useFilter } from "@/Components/PageFilters/usePageFilter";
const Product = () => {
  const { isCollapsed } = useSidebarStore();
  const [isActiveTab, setIsActiveTab] = useState(true);
  const {
    data: products,
    isFetching,
    isError,
    productLength,
  } = useFetchProducts();
  console.log(products)
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const { isPopupOpen, openPopup, closePopup } = useProductStore();
  const { categoryLength } = useFetchCategories();
  const { editingProduct } = useEditProductStore();
  const productFilter = (products, selectedFilter) => {
    if (selectedFilter === "Low Stock") {
      return products.filter((product) => product.stock < 5);
    }
    return products;
  };
  const {
    selectedFilter,
    handleActiveFilterChange,
    handleSearch,
    selectedDate,
    handleDateFilter,
    filteredItems: filteredProducts,
  } = useFilter(products, productFilter);

  return (
    <section>
      {/* empty state */}
      {productLength === 0 && isPopupOpen === false ? (
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
              First up:Add your products Dear <br /> Merchants in order to start
              making <br /> sales
            </p>
          </div>
          <div className="flex justify-center mt-3">
            <AddProduct1
              isPopupOpen={isPopupOpen}
              openPopup={openPopup}
              closePopup={closePopup}
            />
          </div>
        </div>
      ) : (
        <div className="mt-[73px]">
          <div
            className={` ${
              isCollapsed ? "lg:ml-20" : "lg:ml-56"
            } lg:overflow-hidden `}
          >
            <AnimatePresence mode="wait">
              {isPopupOpen ? (
                <motion.div
                  key="add-product"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <AddProduct1
                    isPopupOpen={isPopupOpen}
                    openPopup={openPopup}
                    closePopup={closePopup}
                  />
                </motion.div>
              ) : editingProduct ? (
                <motion.div
                  key="edit-product"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <EditProduct />
                </motion.div>
              ) : (
                <motion.section>
                  <div
                    className={` ${
                      isCollapsed ? "max-w-[1100px]" : "max-w-[940px]"
                    } mx-auto`}
                  >
                    <article className="flex flex-col lg:flex-row gap-2 lg:justify-between lg:items-center">
                      <DashboardIntro introText={"Product Management"} />
                      {isActiveTab ? (
                        <AddProduct1
                          isPopupOpen={isPopupOpen}
                          openPopup={openPopup}
                          closePopup={closePopup}
                        />
                      ) : (
                        <button
                          className="bg-green text-white font-light flex items-center gap-1 w-[135px] rounded-md p-1 h-[38px]"
                          onClick={() => setCategoryOpen(true)}
                        >
                          <FiPlus />
                          Add Category
                        </button>
                      )}
                    </article>
                    {isFetching ? (
                      <div className="grid grid-cols-3 gap-20 mt-10">
                        <Skeleton className="w-[250px] h-[180px] rounded-sm" />
                        <Skeleton className="w-[250px] h-[180px] rounded-sm" />
                      </div>
                    ) : (
                      <div className="flex gap-20 mt-10">
                        <DashboardBox
                          text="Total Categories"
                          data={categoryLength || 0}
                          width="w-[50%]"
                          spacing="my-5"
                        />
                        <DashboardBox
                          text="Total Products"
                          data={productLength || 0}
                          width="w-[50%]"
                          spacing="my-5"
                        />
                      </div>
                    )}
                    <div
                      className={`flex justify-between mx-auto h-[40px] mt-9`}
                    >
                      <div className="flex gap-1 rounded-md bg-[#f5f5f5] p-[2px]">
                        <button
                          className={
                            isActiveTab
                              ? "bg-[#004324] text-white font-bold block w-[100px] rounded-md"
                              : "w-[100px] rounded-md text-green font-bold"
                          }
                          onClick={() => setIsActiveTab(true)}
                        >
                          Products
                        </button>
                        <button
                          className={
                            isActiveTab
                              ? "w-[100px] rounded-md text-green font-bold"
                              : "bg-[#004324] text-white font-bold p-inherit block w-[100px] rounded-md"
                          }
                          onClick={() => setIsActiveTab(false)}
                        >
                          Category
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* tables and filters */}
                  <div
                    className={`${
                      isCollapsed ? "max-w-[1100px]" : "max-w-[940px]"
                    } mx-auto  `}
                  >
                    {/* filters */}
                    <PageFilters
                      filters={["All", "Low Stock"]}
                      page="Products"
                      searchPlaceholder="Search Product..."
                      activeFilter={selectedFilter}
                      onFilterChange={handleActiveFilterChange}
                      handleSearch={handleSearch}
                      selectedDate={selectedDate}
                      handleDateFilter={handleDateFilter}
                    />
                    {isActiveTab ? (
                      <div>
                        <UserTableListLoader
                          data={filteredProducts}
                          loading={isFetching}
                          error={isError}
                          cols={4}
                        >
                          <ProductTable
                            data={filteredProducts}
                            isFetching={isFetching}
                            isError={isError}
                          />
                        </UserTableListLoader>
                      </div>
                    ) : (
                      <CategoryTable />
                    )}
                    {/* {isCategoryOpen && (? */}
                    <AddCategory
                      isCategoryOpen={isCategoryOpen}
                      setCategoryOpen={setCategoryOpen}
                    />
                    {/* )} */}
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
