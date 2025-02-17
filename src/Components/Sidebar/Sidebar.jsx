
import {
  nilelogowhite,
  iconExpandCollapsible,
  nileBagOnly,
} from "../../assets";
import Links from "../../Links";
import Policy from "../PopupModals/Policy";
import { useSidebarStore } from "../../ZustandStores/sidebarStore";
import { usePolicyStore } from "../../ZustandStores/policyStore";
import { useDropDown } from "../../ZustandStores/dropDown";
import { useEffect } from "react";
const Sidebar = () => {
  const {
    sidebarOpen,
    setSidebarOpen,
    setIsCollapsed,
    isCollapsed,
    setIsDesktop,
  } = useSidebarStore();
  const { policyOpen, openPolicy } = usePolicyStore();
  const { isDropdownOpen } = useDropDown();
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth);
      if (window.innerWidth <= 1000) setIsCollapsed(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Overlay for small screens */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></button>
      )}

      {/* Sidebar */}
      {/* overflow-x-hidden overflow-y-scroll  */}
      <aside
        className={`fixed top-0 left-0 bottom-0 h-screen z-20 bg-[#004324] text-white p-3 transition-all transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0  ${
          isCollapsed
            ? "w-[110px] duration-100 delay-100 ease-in"
            : "w-[250px] duration-100 delay-100 ease-in"
        }`}
      >
       <button type="button" className="bg-white w-6 h-6 rounded-full lg:flex items-center border  border-green fixed z-100 -right-2 top-20 hidden" onClick={setIsCollapsed}>
        <img src={iconExpandCollapsible}  className={isCollapsed?'block rotate-180 transition-transform':'block'} alt="icon to expand and collapse sidebar" />
        </button>
        <img src={isCollapsed?nileBagOnly:nilelogowhite} alt="" className={`${isCollapsed?'w-[55px] object-fit':'w-[110px]'} flex`} />
        <Links isCollapsed={isCollapsed}  />
      </aside>  
      
      {/* terms and conditions */}
      {policyOpen && <Policy />}
    </>
  );
};

export default Sidebar;
