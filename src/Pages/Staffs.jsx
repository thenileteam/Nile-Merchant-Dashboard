import { useSidebarStore } from "@/ZustandStores/sidebarStore";
import EmptyState from "../Components/StaffManagement/EmptyState";
import AddStaff from "../Components/PopupModals/AddStaff";
import StaffTable from "../Components/StaffManagement/StaffTable";
import { useState } from "react";
import { useFetchStaffs } from "@/datahooks/staffs/usestaffhook";
import {EmptyStateIcon} from '../Components/Store/AllStoreComp/StoreSettingIcons'
const Staffs = () => {
  const [showStaffPopUp, setShowStaffPopUp] = useState(false);
  const { isCollapsed } = useSidebarStore();
  const { staffs, isFetching, isError } = useFetchStaffs();
  return (
    <>
      <div
        className={
          isCollapsed
            ? "flex-grow lg:ml-20 overflow-x-hidden"
            : "flex-grow lg:ml-56 overflow-x-hidden"
        }
      >
        <section>
          {staffs?.length=== 0 ? (
            <EmptyState
              title="You don't have staffs yet"
              description="Add a staff to see your staffs"
              buttonText="Add Staff"
              showPopUp={showStaffPopUp}
              icon={EmptyStateIcon}
              setShowPopUp={setShowStaffPopUp}
              PopUpComponent={AddStaff}
            />
           ) : (
            <StaffTable
              isCollapsed={isCollapsed}
              setShowStaffPopUp={setShowStaffPopUp}
            />
          )
          } 
        {/*   { showStaffPopUp && */}
          <AddStaff showStaffPopUp={showStaffPopUp} setShowStaffPopUp={setShowStaffPopUp} />
        </section>
      </div>
    </>
  );
};

export default Staffs;
