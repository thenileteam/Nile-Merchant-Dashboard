
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
import Navbar from '../Navbar/Navbar'
import { useFetchUser } from '../../datahooks/users/userhooks';
const Sidebar = () => {
  const { user } = useFetchUser();
  const {
    sidebarOpen,
    setSidebarOpen,
    setIsCollapsed,
    isCollapsed,
    setIsDesktop,
  } = useSidebarStore();
  const { policyOpen } = usePolicyStore();
  const { isDropdownOpen } = useDropDown();
  const isStoreOwner = localStorage.getItem("storeOwnerRole");
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
      <Navbar profilePic={user && user.image ? user.image : ''}/>
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
        className={`fixed top-[60px] left-0 bottom-0 border max-h-screen z-10 bg-white text-green px-3 transition-all transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0  ${
          isCollapsed
            ? "w-[90px] duration-100 delay-100 ease-in"
            : "w-[250px] duration-100 delay-100 ease-in"
        }`}
      >
       <button type="button" className="bg-white w-4 h-4 lg:flex items-center border border-green fixed z-100 -right-2 top-5 hidden px-[2px]" onClick={setIsCollapsed}>
        <img src={iconExpandCollapsible}  className={`${isCollapsed?'block rotate-180 transition-transform':'block'} border-r border-green`} alt="icon to expand and collapse sidebar" />
        </button>
        <Links isCollapsed={isCollapsed}  />
      </aside>  
      
      {/* terms and conditions */}
      {policyOpen && <Policy />}
    </>
  );
};

export default Sidebar;
