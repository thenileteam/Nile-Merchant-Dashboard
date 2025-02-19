/* eslint-disable react/prop-types */

import { useSidebarStore } from "../../ZustandStores/sidebarStore";
import { useProfileStore } from "@/ZustandStores/profileStore";
import { nilelogogreen } from "@/assets";
import { FiSearch } from "react-icons/fi";
import ProfileImageDropDown from '../PlaceholderImage/ProfileImageDropdown'
const Navbar = ({ profilePic }) => {
  const { sidebarOpen, setSidebarOpen } = useSidebarStore();
  const { toggleProfile } = useProfileStore();
  return (
    <nav className="bg-white fixed top-0 border-b z-20 w-full py-2">
      <div className="container mx-auto px-4  ">
        <div className="flex-container flex items-center justify-between lg:gap-24">
          {/*menu and logo container */}
          <div className="flex items-center gap-2 ">
            <button
              type="button"
              className="lg:hidden text-gray-800"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    sidebarOpen
                      ? "M6 18L18 6M6 6l12 12" // Close icon
                      : "M4 6h16M4 12h16M4 18h16" // Menu icon
                  }
                />
              </svg>
            </button>
            <img src={nilelogogreen} alt="" className="w-[120px]" />
          </div>
          {/* search bar and profile picture */}
          <div className="lg:flex-1 flex items-center justify-between  ">
            <div className="relative hidden lg:block">
              <input
                type="search"
                id=""
                name=""
                placeholder="Search.."
                className="  rounded-3xl border border-zinc-300 py-[6px] pl-9 pr-3 w-[250px] font-extralight"
              />
              <FiSearch className={`absolute top-[13px]  left-4 stroke-current stroke-[1px] text-sm`} />
            </div>
            {/* profileimage */}
            <ProfileImageDropDown profilePic={profilePic} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
