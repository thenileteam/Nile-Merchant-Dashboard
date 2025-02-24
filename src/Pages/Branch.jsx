import { useSidebarStore } from "../ZustandStores/sidebarStore";
import DashboardBox from "@/Components/Dashboard/DashboardBox";
import BranchTable from "@/Components/StaffManagement/BranchTable";
import { useParams } from "react-router-dom";
import {
  useFetchLocations,
  useFetchSingleLocation
} from "@/datahooks/location/useLocationhook";
import TransferInventory from "@/Components/PopupModals/TransferInventory";
import { useTransferStore } from "../ZustandStores/transferStore";
import EmptyState from "@/Components/StaffManagement/EmptyState";
import { useFetchProducts } from "@/datahooks/products/productshooks";
import { useFetchDashboardData } from "@/datahooks/users/userhooks";
import DashboardIntro from "@/Components/Dashboard/DashboardIntro";
import { EmptyStateIcon } from "../Components/Store/AllStoreComp/StoreSettingIcons";
import AddProduct1 from "@/Components/PopupModals/AddProduct1";
import { useProductStore } from "../ZustandStores/transferStore";
const Branch = () => {
  const { id } = useParams();
  const { setOpenTransfer, isTransferOpen } = useTransferStore();
  const { locations } = useFetchLocations();
  const getName = locations?.find((location) => location.id === id);
  const { isCollapsed } = useSidebarStore();
  const { locationProducts } = useFetchSingleLocation(id);
  const { isPopupOpen, openPopup, closePopup } = useProductStore();
  const { dashboardData } = useFetchDashboardData();
  const { productLength } = useFetchProducts();
  return (
    <>
      <div
        className={
          isCollapsed
            ? "flex-grow lg:ml-20 overflow-x-hidden"
            : "flex-grow lg:ml-56 overflow-x-hidden"
        }
      >
        {isPopupOpen ?
          <div className="mt-[73px]">
            <AddProduct1
              isPopupOpen={isPopupOpen}
              openPopup={openPopup}
              closePopup={closePopup}
            />  

          </div>:
          <div className="page-addProductIsNotActive">
            <div
              className={`${isCollapsed ? "max-w-[1100px]" : "max-w-[950px]"
                } mt-[73px] mx-auto`} >
              <article className="flex lg:items-center justify-between">
                <DashboardIntro
                  introText={
                    getName?.locationName.split("")[0].toUpperCase() +
                    getName?.locationName.slice(1) || "Branch"
                  }
                />
                <AddProduct1
                  isPopupOpen={isPopupOpen}
                  openPopup={openPopup}
                  closePopup={closePopup}
                />
              </article>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 lg:gap-10 mt-10">
                <DashboardBox
                  text="Total Orders"
                  spacing="my-5"
                  width="w-full"
                  data={dashboardData?.orders?.totalOrders}
                />
                <DashboardBox
                  text="In Stock"
                  spacing="my-4"
                  width="w-full"
                  data={productLength}
                />
                <DashboardBox
                  text="Out of Stock"
                  spacing="my-4"
                  width="w-full"
                  data={24}
                />
              </div>
            </div>

            {/* other part */}
            <section>
              {locationProducts?.length === 0 ? (
                <EmptyState
                  title="You have not added any product to this location yet"
                  description="Add a product to this branch to see your staffs"
                  buttonText="Transfer products"
                  showPopUp={isTransferOpen}
                  icon={EmptyStateIcon}
                  setShowPopUp={setOpenTransfer}
                  PopUpComponent={TransferInventory}
                />
              ) : (
                <BranchTable
                  isCollapsed={isCollapsed}
                  setOpenTransfer={setOpenTransfer}
                />
              )}
            </section>
            {/*  */}
          </div>}
      </div>
      <TransferInventory
        isTransferOpen={isTransferOpen}
        setOpenTransfer={setOpenTransfer}
      />
    </>
  );
};

export default Branch;
