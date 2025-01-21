import { useSidebarStore } from "@/ZustandStores/sidebarStore";
import Navbar from "../Components/Navbar/Navbar";
import EmptyStaffState from "../Components/StaffManagement/EmptyStaffState";
import { useFetchUser } from "@/datahooks/users/userhooks";
import AddStaff from "../Components/PopupModals/AddStaff";
import StaffTable from "../Components/StaffManagement/StaffTable";
import { useState } from "react";
import { useFetchStaffs } from "@/datahooks/staffs/usestaffhook";
const Staffs = () => {
  const [showStaffPopUp, setShowStaffPopUp] = useState(false);
  const { user } = useFetchUser();
  const { isCollapsed } = useSidebarStore();
  const { staffs, isFetching, isError } = useFetchStaffs();
  return (
    <>
      {/* <Sidebar /> */}
      <div
        className={
          isCollapsed
            ? "flex-grow lg:ml-20 overflow-x-hidden"
            : "flex-grow lg:ml-56 overflow-x-hidden"
        }
      >
        <Navbar
          title="Staff Management"
          profilePic={user && user.image ? user.image : ""}
        />
        <section>
          {staffs?.length === 0 ?
         <EmptyStaffState
         showStaffPopUp={showStaffPopUp}
         setShowStaffPopUp={setShowStaffPopUp}
       />:
            <StaffTable
              isCollapsed={isCollapsed}
              setShowStaffPopUp={setShowStaffPopUp}
            />
          }
          
          {showStaffPopUp && <AddStaff setShowStaffPopUp={setShowStaffPopUp} />}
        </section>
      </div>
    </>
  );
};

export default Staffs;
