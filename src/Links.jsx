import { useLocation } from "react-router-dom";
import { usePolicyStore } from "./ZustandStores/policyStore";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import StoreSettingsLinks from "./Components/Store/AllStoreComp/StoreSettingLinks";
import { useDropDown } from "./ZustandStores/dropDown";
import SingleSidebarLink from "./Components/Sidebar/SingleSidebarLink";
import { sidebarLinks } from "./utils/routesMaps";
import { useStore } from "./ZustandStores/generalStore";
import ReactLoading from "react-loading";

const Links = ({ isCollapsed }) => {
  const isStoreOwner = localStorage.getItem("storeOwnerRole");
  const isStoreStaff = localStorage.getItem("staffRole");
  const location = useLocation();
  const { openPolicy } = usePolicyStore();
  const { staff } = useStore();
  const { isDropdownOpen, setIsDropdownOpen } = useDropDown();
  // Function to determine if link is active
  const isActive = (path) => location.pathname === path;
  //Get link classes based on active state
  const getLinkClasses = (path) => {
    return `py-[11px] rounded-lg px-[6px] flex items-center justify-between font-light text-sm
    ${isActive(path) ? "bg-[#004324] text-[#fff]" : "text-[#004324]"}`;
  };
  
  // Extract staff roles
  const staffRoles = staff?.roles?.map((role) => role.name.split(' ')[0].toLowerCase());
console.log(staffRoles)
  // Filter sidebar links based on staff roles
  const filteredLinks = sidebarLinks.filter((link) => {
    if ( isStoreOwner) {
      return true; // Show all links for store owner
    } else if ( isStoreStaff) {
      // Show links that match staff roles
      const roleReturned = staffRoles?.includes(link.name.split(' ')[0].toLowerCase())
      return roleReturned;
    }
    return false;
  });

  // Render sidebar links
  const renderLinks = () => {
    if ( isStoreOwner) {
      return (
        <>
          {filteredLinks.map((item) => (
            <SingleSidebarLink
              text={item.name}
              path={item.path}
              icon={item.icon}
              getLinkClasses={getLinkClasses}
              isActive={isActive}
              key={item.name}
            />
          ))}
          {/* Store Settings Dropdown */}
          <div
            className={`mt-4 border-b-2 border-t-2 border-dotted py-3 transition-all duration-300`}
            id="settings"
          >
            <div className="flex items-center justify-between gap-1 pb-1">
              <li>Store {isCollapsed ? "" : "Settings"}</li>
              <button
                type="button"
                className="bg-transparent"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
            </div>
            {/* Dropdown links */}
            {isDropdownOpen && (
              <StoreSettingsLinks
                isCollapsed={isCollapsed}
                getLinkClasses={getLinkClasses}
                isActive={isActive}
                isDropDownOpen={isDropdownOpen}
              />
            )}
          </div>
        </>
      );
    }

    if ( isStoreStaff) {
      if (!staff?.roles) {
        return (
          <div className="flex items-center justify-center h-full">
            <ReactLoading type="spin" color="#004324" height={50} width={50} />
          </div>
        );
      }

      return filteredLinks.map((item) => (
        <SingleSidebarLink
          text={item.name}
          path={item.path}
          icon={item.icon}
          getLinkClasses={getLinkClasses}
          isActive={isActive}
          key={item.name}
        />
      ));
    }

    return null;
  };

  return (
    <div className={`custom-scrollbar ${isDropdownOpen ? "overflow-y-auto" : ""}`}>
      <ul className={`mt-4 ${isDropdownOpen ? "h-[500px]" : "h-[350px]"}`}>
        {renderLinks()}
      </ul>
      {/* Footer */}
      {/* {!isCollapsed && !isDropdownOpen && (
        <footer className="fixed bottom-2">
          <div className="">
            <button
              type="button"
              className="hover:opacity-50"
              onClick={openPolicy}
            >
              Terms and conditions
            </button>
            <div className="flex">
              <a
                href="https://nile.ng/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold block relative"
              >
                @Nile Technologies
              </a>
              <span className="bg-blue-500 p-1 rounded-md text-white">
                beta
              </span>
            </div>
          </div>
        </footer> */}
      {/* )} */}
    </div>
  );
};

export default Links;