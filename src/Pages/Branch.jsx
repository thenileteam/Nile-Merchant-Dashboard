import Navbar from "../Components/Navbar/Navbar";
import Sidebar from '@/Components/Sidebar/Sidebar';
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import DashboardBox from "@/Components/Dashboard/DashboardBox";
import { useFetchUser } from '@/datahooks/users/userhooks';
import BranchTable from "@/Components/StaffManagement/BranchTable";
import { totalOrders, outOfStock, totalProfit } from "@/assets";
const Branch = () => {
    const { user } = useFetchUser();
    const {isCollapsed} = useSidebarStore()
  return (
    <>
    <Sidebar />
    <div
      className={
        isCollapsed
          ? "flex-grow lg:ml-20 overflow-x-hidden"
          : "flex-grow lg:ml-56 overflow-x-hidden"
      }
    >
      <Navbar
        title="Branch 1"
        profilePic={user && user.image ? user.image : ""}
              />
        <div
              className={`${
                isCollapsed ? "max-w-[1050px]" : "max-w-[950px]"
              } p-6 mt-28 mx-auto`}
            >
              <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-2 lg:gap-10">
                <DashboardBox
                  text="Total Orders"
                  imgWidth="w-9"
                  bgColor="bg-[#FCDADF]"
                  width="w-full"
                  image={totalOrders}
                  data={'416'}
                />
                <DashboardBox
                  text="In Stock"
                  bgColor="bg-[#FFE8DF]"
                  imgWidth="w-9"
                  width="w-full"
                  image={totalProfit}
                  data={'411'}
                />
                <DashboardBox
                  text="Out of Stock"
                  bgColor="bg-[#FFDBFA]  "
                  width="w-full"
                  image={outOfStock}
                  imgWidth="w-9"
                  data={'24'}
                />
              </div>
            </div>      

      <section>
        <BranchTable isCollapsed={isCollapsed}/>
        {/* <AddLocation/> */}
      </section>
    </div>
  </>
  )
}

export default Branch