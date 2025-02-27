import { NavLink } from "react-router-dom";
import { useSidebarStore } from "@/ZustandStores/sidebarStore";
const SingleSidebarLink = ({ icon: Icon, path, getLinkClasses, text, isActive }) => {
  const { isCollapsed } = useSidebarStore();
  return (
    <NavLink to={path}  role="menuitem"
    aria-current="page">
      <li className={`cursor-pointer mt-1 w-full`}>
        <div className={`${getLinkClasses(path)}`}>
          <div
            className={`flex items-center  ${
              isCollapsed ? "mx-auto" : "mx-0"
            } gap-2`}
          >
            {/* SVG icon */}
            <Icon isActive={isActive} path={path} />
            <p className={`${isCollapsed ? "hidden" : "block"}`}>{text}</p>
          </div>
        </div>
      </li>
    </NavLink>
  );
};

export default SingleSidebarLink;
