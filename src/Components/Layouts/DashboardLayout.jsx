/* eslint-disable react/prop-types */

import Sidebar from "../Sidebar/Sidebar";
import NewNavbar from "./NewNavbar";

const DashboardLayout = ({ children , isCollapsed}) => {
  console.log(isCollapsed)
  return (
    <>
      <Sidebar />
      <div className="flex flex-col overflow-x-hidden flex-1">
        <NewNavbar isCollapsed={isCollapsed} />

        <div className={`flex-1 ${isCollapsed?'lg:ml-20':'lg:ml-56'}`}>{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
