import LocationTable from "@/Components/StaffManagement/LocationTable";
import { useFetchUser } from '../datahooks/users/userhooks'
import { useSidebarStore } from "@/ZustandStores/sidebarStore";
import Navbar from '../Components/Navbar/Navbar'
const Location = () => {
  const { user } = useFetchUser();
  const { isCollapsed } = useSidebarStore();
  return (
    <>
      {/* Sidebar  */}
      <div
        className={
          isCollapsed
            ? "flex-grow lg:ml-20 overflow-x-hidden"
            : "flex-grow lg:ml-56 overflow-x-hidden"
        }
      >
        <Navbar
          title="Store Locations"
          profilePic={user && user.image ? user.image : ""}
        />
        <section>
          <LocationTable isCollapsed={ isCollapsed} />
          {/* <AddLocation/> */}
        </section>
      </div>
    </>
  );
};

export default Location;
