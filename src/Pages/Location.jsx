import LocationTable from "@/Components/StaffManagement/LocationTable";
import { useSidebarStore } from "@/ZustandStores/sidebarStore";
const Location = () => {
  const { isCollapsed } = useSidebarStore();
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
          <LocationTable isCollapsed={ isCollapsed} />
        </section>
      </div>
    </>
  );
};

export default Location;
