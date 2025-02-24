import Navbar from "../Components/Navbar/Navbar";
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import DashboardBox from "@/Components/Dashboard/DashboardBox";
import { useFetchUser } from "@/datahooks/users/userhooks";
import BranchTable from "@/Components/StaffManagement/BranchTable";
import { totalOrders, outOfStock, totalProfit } from "@/assets";
import { useParams } from "react-router-dom";
import {
  useFetchLocations,
  useFetchSingleLocation
} from "@/datahooks/location/useLocationhook";
import TransferInventory from "@/Components/PopupModals/TransferInventory";
import { useState } from "react";
import EmptyState from "@/Components/StaffManagement/EmptyState";
import { useFetchProducts } from "@/datahooks/products/productshooks";
import { useFetchDashboardData } from "@/datahooks/users/userhooks";
import { CustomLoading } from "@/Components/uicomps/custom-loading";
const Branch = () => {
  const { id } = useParams();
  const [openTransfer, setOpenTransfer] = useState(false);
  const { locations } = useFetchLocations();
  const getName = locations?.find((location) => location.id === id);
  const { user } = useFetchUser();
  const { isCollapsed } = useSidebarStore();
  const { locationProducts, isFetchingProductsInLocation } =
    useFetchSingleLocation(id);
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
        <Navbar
          title={
            getName?.locationName.split("")[0].toUpperCase() +
              getName?.locationName.slice(1) || "Branch"
          }
          profilePic={user && user.image ? user.image : ""}
        />
        <div
          className={`${
            isCollapsed ? "max-w-[1050px]" : "max-w-[820px]"
          } mt-28 mx-auto`}
        >
          <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 lg:gap-10">
            <DashboardBox
              text="Total Orders"
              imgWidth="w-9"
              bgColor="bg-[#FCDADF]"
              width="w-full"
              image={totalOrders}
              data={dashboardData?.orders?.totalOrders}
            />
            <DashboardBox
              text="In Stock"
              bgColor="bg-[#FFE8DF]"
              imgWidth="w-9"
              width="w-full"
              image={totalProfit}
              data={productLength}
            />
            <DashboardBox
              text="Out of Stock"
              bgColor="bg-[#FFDBFA]  "
              width="w-full"
              image={outOfStock}
              imgWidth="w-9"
              data={24}
            />
          </div>
        </div>

        <section>
          <CustomLoading
            isLoading={isFetchingProductsInLocation}
            error={false}
          >
            {locationProducts?.length === 0 ? (
              <EmptyState
                title="You have not added any product to this location yet"
                description="Add a product to this branch to see your staffs"
                buttonText="Transfer products"
                showPopUp={openTransfer}
                setShowPopUp={setOpenTransfer}
                PopUpComponent={TransferInventory}
              />
            ) : (
              <BranchTable
                isCollapsed={isCollapsed}
                setOpenTransfer={setOpenTransfer}
              />
            )}
          </CustomLoading>
        </section>
      </div>
      {openTransfer && <TransferInventory setOpenTransfer={setOpenTransfer} />}
    </>
  );
};

export default Branch;
