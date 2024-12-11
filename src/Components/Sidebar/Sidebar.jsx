/* eslint-disable react/prop-types */
import { nilelogowhite } from "../../assets";
import Links from "../../Links";
import { useUserStore } from "../../zustandStore";
const Sidebar = () => {
  
const{sidebarOpen, setSidebarOpen} = useUserStore()
  return (
    <>
      {/* Overlay for small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={()=>setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-[290px] z-20 bg-[#004324] border-2 text-white p-5 transition-transform transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <img src={nilelogowhite} alt="" className="w-[100px] flex" />
        <Links />
      </div>
    </>
  );
};

export default Sidebar;
