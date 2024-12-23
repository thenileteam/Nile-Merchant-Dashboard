import { notification } from "../../assets";
import ProfileImage from "../PlaceholderImage/PlaceholderImage";
import { Link } from "react-router-dom";
import {useSidebarStore} from '../../ZustandStores/sidebarStore'
const Navbar = ({ title, icon, profilePic, link }) => {
  const{sidebarOpen, setSidebarOpen,} = useSidebarStore()
  return (
    <nav className="bg-[#EAF4E2] fixed top-0 shadow-md z-10 w-full py-2">
      <div className="container mx-auto lg:mx-0 lg:px-10 px-4">
        <div className="flex-container flex gap-4 lg:gap-10">
          {/*parent first child */}
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
          {/* parent second child */}
          <div className="page-head flex items-center justify-between w-[95%] lg:max-w-[1000px]">
            {/* first */}
            <div className="flex gap-2 items-center md:pl-8">
              {icon &&
                //  <Link to={link}> 
                  <img src={icon} alt={`${title} icon`} className="hidden lg:block" />
                  }
              <h1 className={icon?"lg:text-[32px] text-[24px]  font-bold" : 'lg:text-[32px] text-[24px]  font-bold pl-2'}>{title}</h1>
            </div>
            {/* second */}
            <div className="flex gap-4 items-center lg:pr-3">
              <div className="input-div relative hidden lg:block">
                <label htmlFor="Search" className="sr-only">
                  {" "}
                  Search{" "}
                </label>
                <input
                  type="search"
                  id="Search"
                  placeholder=""
                  className="lg:block rounded-md border-[#6E6E6E] border py-1"
                />
                <button
                  type="button"
                  className="text-gray-600 hover:text-gray-700 absolute top-[9px] left-2"
                >
                  <span className="sr-only">Search</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4  "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex gap-4 items-center">
                {/*  */}
                {/* <Link to="/notification">
              <img src={notification} alt="notification-icon" className="hidden lg:block" />
            </Link> */}
                <Link to="/profilesetting">
                  <ProfileImage
                    profileImage={profilePic}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
