import { Link, useLocation } from "react-router-dom";
import { copyright } from "./assets";
import { useState } from "react";
import { usePolicyStore } from "./ZustandStores/policyStore";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import StoreSettingsLinks from "./Components/Store/AllStoreComp/StoreSettingLinks";
import {useDropDown} from'./ZustandStores/dropDown'
const Links = ({ isCollapsed }) => {
  const location = useLocation();
  const { openPolicy } = usePolicyStore();
  const {isDropdownOpen, setIsDropdownOpen} = useDropDown();
  const closeDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  // Function to determine if link is active
  const isActive = (path) => location.pathname === path;
  const getLinkClasses = (path) => {
    return `py-2 rounded-lg px-2 flex items-center justify-between border
    ${isActive(path) ? "bg-[#fff] text-[#004324]" : "text-[#fff]"}`;
  };
  return (
    <ul className={`${isCollapsed ? "mt-8" : "mt-9"}  overflow-x-hidden`}>
      {/* Dashboard overview */}
      <Link to="/dashboard">
        <li className={`cursor-pointer mt-4 w-full`}>
          <div className={`${getLinkClasses("/dashboard")}`}>
            <div
              className={`flex items-center  ${
                isCollapsed ? "mx-auto" : "mx-0"
              } gap-3`}
            >
              {/* SVG icon */}
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.25 10.8262C8.59721 10.8262 10.5 8.92338 10.5 6.57617C10.5 4.22896 8.59721 2.32617 6.25 2.32617C3.90279 2.32617 2 4.22896 2 6.57617C2 8.92338 3.90279 10.8262 6.25 10.8262Z"
                  stroke={isActive("/dashboard") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                />
                <path
                  d="M18 9.68331V10.8262M18 9.68331C16.9878 9.68331 16.0961 9.17824 15.573 8.41134M18 9.68331C19.0122 9.68331 19.9039 9.17824 20.427 8.41134M15.573 8.41134L14.5004 9.11188M15.573 8.41134C15.2637 7.95776 15.0833 7.4126 15.0833 6.82617C15.0833 6.23981 15.2636 5.69471 15.5729 5.24117M20.427 8.41134L21.4996 9.11188M20.427 8.41134C20.7363 7.95776 20.9167 7.4126 20.9167 6.82617C20.9167 6.23981 20.7364 5.69471 20.4271 5.24117M18 3.96903C19.0123 3.96903 19.9041 4.47417 20.4271 5.24117M18 3.96903C16.9877 3.96903 16.0959 4.47417 15.5729 5.24117M18 3.96903V2.82617M20.4271 5.24117L21.5 4.54046M15.5729 5.24117L14.5 4.54046"
                  stroke={isActive("/dashboard") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M17.75 22.3262C20.0972 22.3262 22 20.4234 22 18.0762C22 15.729 20.0972 13.8262 17.75 13.8262C15.4028 13.8262 13.5 15.729 13.5 18.0762C13.5 20.4234 15.4028 22.3262 17.75 22.3262Z"
                  stroke={isActive("/dashboard") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                />
                <path
                  d="M6.25 22.3262C8.59721 22.3262 10.5 20.4234 10.5 18.0762C10.5 15.729 8.59721 13.8262 6.25 13.8262C3.90279 13.8262 2 15.729 2 18.0762C2 20.4234 3.90279 22.3262 6.25 22.3262Z"
                  stroke={isActive("/dashboard") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                />
              </svg>
              {/* {isCollapsed ? "" : "Dashboard Overview"} */}
              <p className={`${isCollapsed ? "hidden" : "block"}  `}>
                Dashboard Overview
              </p>
            </div>
          </div>
        </li>
      </Link>

      {/* Orders & Shipping */}
      <Link to="/orders">
        <li className={`cursor-pointer mt-4 w-full`}>
          <div className={`${getLinkClasses("/orders")}`}>
            <div
              className={`flex items-center  ${
                isCollapsed ? "mx-auto" : "mx-0"
              } gap-3`}
            >
              {/* SVG icon */}
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 2.64062H4.30116C5.48672 2.64062 6.0795 2.64062 6.4814 3.01204C6.88331 3.38347 6.96165 4.00369 7.11834 5.24413L8.24573 14.1693C8.45464 15.8232 8.5591 16.6501 9.09497 17.1454C9.63085 17.6406 10.4212 17.6406 12.002 17.6406H22"
                  stroke={isActive("/orders") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.5 21.6406C12.3284 21.6406 13 20.9691 13 20.1406C13 19.3122 12.3284 18.6406 11.5 18.6406C10.6716 18.6406 10 19.3122 10 20.1406C10 20.9691 10.6716 21.6406 11.5 21.6406Z"
                  stroke={isActive("/orders") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                />
                <path
                  d="M18.5 21.6406C19.3284 21.6406 20 20.9691 20 20.1406C20 19.3122 19.3284 18.6406 18.5 18.6406C17.6716 18.6406 17 19.3122 17 20.1406C17 20.9691 17.6716 21.6406 18.5 21.6406Z"
                  stroke={isActive("/orders") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                />
                <path
                  d="M18 14.6406H16C14.1144 14.6406 13.1716 14.6406 12.5858 14.0548C12 13.469 12 12.5262 12 10.6406V8.64062C12 6.75501 12 5.8122 12.5858 5.22642C13.1716 4.64063 14.1144 4.64062 16 4.64062H18C19.8856 4.64062 20.8284 4.64063 21.4142 5.22642C22 5.8122 22 6.75501 22 8.64062V10.6406C22 12.5262 22 13.469 21.4142 14.0548C20.8284 14.6406 19.8856 14.6406 18 14.6406Z"
                  stroke={isActive("/orders") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 7.64062H17.5"
                  stroke={isActive("/orders") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isCollapsed ? "" : "Orders"}
            </div>
          </div>
        </li>
      </Link>

      {/* Products */}
      <Link to="/product">
        <li className={`cursor-pointer mt-4 w-full`}>
          <div className={`${getLinkClasses("/product")}`}>
            <div
              className={`flex items-center  ${
                isCollapsed ? "mx-auto" : "mx-0"
              } gap-3`}
            >
              {/* SVG icon */}
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 22.6406C12.1818 22.6406 11.4002 22.2994 9.83691 21.617C8.01233 20.8206 6.61554 20.2109 5.64648 19.6406H2M13 22.6406C13.8182 22.6406 14.5998 22.2994 16.1631 21.617C20.0544 19.9185 22 19.0692 22 17.6406V7.14062M13 22.6406V11.6406M4 7.14062V10.1406"
                  stroke={isActive("/product") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.32592 10.332L6.40472 8.91848C4.80157 8.14273 4 7.75485 4 7.14062C4 6.5264 4.80157 6.13852 6.40472 5.36277L9.32592 3.94924C11.1288 3.07683 12.0303 2.64062 13 2.64062C13.9697 2.64062 14.8712 3.07682 16.6741 3.94924L19.5953 5.36277C21.1984 6.13852 22 6.5264 22 7.14062C22 7.75485 21.1984 8.14273 19.5953 8.91848L16.6741 10.332C14.8712 11.2044 13.9697 11.6406 13 11.6406C12.0303 11.6406 11.1288 11.2044 9.32592 10.332Z"
                  stroke={isActive("/product") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.1366 4.65625L7.86719 9.62547"
                  stroke={isActive("/product") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 13.6406H5"
                  stroke={isActive("/product") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 16.6406H5"
                  stroke={isActive("/product") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isCollapsed ? "" : "Products"}
            </div>
          </div>
        </li>
      </Link>

      {/* Reviews & Ratings */}
      <Link to="/reviews">
        <li  className={`cursor-pointer mt-4 w-full`}>
          <div className={getLinkClasses("/reviews")}>
            <div  className={`flex items-center  ${
                isCollapsed ? "mx-auto" : "mx-0"
              } gap-3`}>
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2.64062L12.0034 20.0438C11.643 20.0431 11.2835 20.1237 11.0123 20.2858L8.02261 22.0702C5.87285 23.3506 4.58299 22.4029 5.14293 19.9531L5.85285 16.8581C5.98284 16.2733 5.75286 15.4567 5.33291 15.0333L2.85318 12.5331C1.38335 11.0612 1.86329 9.56915 3.90307 9.22637L7.09271 8.69205C7.63266 8.60132 8.27258 8.12749 8.51256 7.6335L10.2724 4.08481C10.7464 3.12376 11.3725 2.64236 12 2.64062ZM12 2.64062H12.0034M15 21.4843L15.9817 22.0702C18.1215 23.3506 19.4214 22.3928 18.8614 19.9531L18.1515 16.8581C18.0215 16.2733 18.2515 15.4567 18.6714 15.0333L21.1512 12.5331C22.611 11.0612 22.1411 9.56915 20.1013 9.22637L16.9116 8.69205C16.3817 8.60132 15.7418 8.12749 15.5018 7.6335L15 6.62163"
                  stroke={isActive("/reviews") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isCollapsed ? "" : "  Reviews & Ratings"}
             
            </div>
          </div>
        </li>
      </Link>

      {/* Customer Management */}
      <Link to="/customer">
        <li className={`cursor-pointer mt-4 w-full`}>
          <div className={`${getLinkClasses("/customer")} transitions`}>
            <div
              className={`flex items-center  ${
                isCollapsed ? "mx-auto" : "mx-0"
              } gap-3`}
            >
              {/* SVG icon */}
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.08069 15.937C3.86241 16.6741 0.668176 18.1792 2.61368 20.0626C3.56404 20.9826 4.62251 21.6406 5.95325 21.6406H13.5468C14.8775 21.6406 15.936 20.9826 16.8863 20.0626C18.8318 18.1792 15.6376 16.6741 14.4193 15.937C11.5625 14.2085 7.93752 14.2085 5.08069 15.937Z"
                  stroke={isActive("/customer") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.5 7.64062C13.5 9.84977 11.7091 11.6406 9.5 11.6406C7.29086 11.6406 5.5 9.84977 5.5 7.64062C5.5 5.43148 7.29086 3.64062 9.5 3.64062C11.7091 3.64062 13.5 5.43148 13.5 7.64062Z"
                  stroke={isActive("/customer") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                />
                <path
                  d="M17 5.64062H22"
                  stroke={isActive("/customer") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 8.64062H22"
                  stroke={isActive("/customer") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 11.6406H22"
                  stroke={isActive("/customer") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isCollapsed ? "" : "Customers Management"}
              {/* <p className={isCollapsed? 'invisible transitions':'visible transitions'}>Customer Management</p> */}
            </div>
          </div>
        </li>
      </Link>

      {/* Financial Management */}
      <Link to="/financial">
        <li className="cursor-pointer mt-4">
          <div className={getLinkClasses("/financial")}>
            <div
              className={`flex items-center  ${
                isCollapsed ? "mx-auto" : "mx-0"
              } gap-3`}
            >
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M20 17.6406H4"
                  stroke={isActive("/financial") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.0001 14.6406C17.0001 14.6406 20 16.8501 20 17.6406C20 18.4312 17 20.6406 17 20.6406"
                  stroke={isActive("/financial") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  opacity="0.4"
                  d="M5 7.64062H20"
                  stroke={isActive("/financial") ? "#004324" : "#ffffff"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.99998 4.64062C6.99998 4.64062 4.00001 6.8501 4 7.64065C3.99999 8.43121 7 10.6406 7 10.6406"
                  stroke={isActive("/financial") ? "#004324" : "#ffffff"}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              {isCollapsed ? "" : "Transactions"}
            </div>
          </div>
        </li>
      </Link>

      {/* Store Setting */}
        <div className={`mt-4 border-b-2 border-t-2 border-dotted py-3  `}>
        <div className="flex items-center justify-between gap-1 pb-1">
          <li>Store {isCollapsed ? "" : "Settings"}</li>
          <button
            type="button"
            className="bg-transparent"
            onClick={closeDropdown}
          >
            {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
        {/*drop down links */}
       {isDropdownOpen && (
          <StoreSettingsLinks
            isCollapsed={isCollapsed}
            getLinkClasses={getLinkClasses}
            isActive={isActive}
            isDropDownOpen={isDropdownOpen}
          />
        )}
      </div> 
      {/* Footer */}
      {!isCollapsed && !isDropdownOpen && (
        <footer className="mt-20  ">
          <div>
            <button
              type="button"
              className="absolute bottom-9 hover:opacity-50"
              onClick={openPolicy}
            >
              Terms and conditions
            </button>
            <a
              href="https://nile.ng/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold block absolute bottom-3"
            >
              @Nile Technologies
            </a>
            <span className="bg-blue-500 p-1 rounded-md absolute bottom-3 right-16">
              beta
            </span>
          </div>
        </footer>
      )}
    </ul>
  );
};

export default Links;
