/* eslint-disable react/prop-types */
import { nilelogowhite, iconExpandCollapsible , nileBagOnly} from "../../assets";
import Links from "../../Links";
import Policy from '../PopupModals/Policy'
import { useSidebarStore } from "../../ZustandStores/sidebarStore";
import { usePolicyStore } from "../../ZustandStores/policyStore";
import{useEffect} from 'react'
const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, setIsCollapsed, isCollapsed, setIsDesktop } = useSidebarStore()
  const{policyOpen} = usePolicyStore()
  useEffect(() => {
    const handleResize = () => {
      console.log('resized and state updated');
      setIsDesktop(window.innerWidth)
      if (window.innerWidth <= 1000) setIsCollapsed(false)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return ()=>window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <>
      {/* Overlay for small screens */}
      {sidebarOpen && (
        <button type='button'
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={()=>setSidebarOpen(false)}
        ></button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-20 bg-[#004324] border-2 text-white p-5 transition-all transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0  ${isCollapsed?'w-[110px] duration-100 delay-100 ease-in':'w-[290px] duration-100 delay-100 ease-in' }` }
      >
        <button type="button" className="bg-white w-6 h-6 rounded-full lg:flex items-center border  border-green fixed -right-2 top-20 hidden" onClick={setIsCollapsed}>
        <img src={iconExpandCollapsible}  className={isCollapsed?'block rotate-180 transition-transform':'block'} alt="icon to expand and collapse sidebar" />
        </button>
        <img src={isCollapsed?nileBagOnly:nilelogowhite} alt="" className={`${isCollapsed?'w-[55px] object-fit':'w-[110px]'} flex`} />
        <Links isCollapsed={isCollapsed}  />
      </div>
      {/* terms and conditions */}
     {policyOpen&& <Policy/>}
    </>
  );
};

export default Sidebar;
