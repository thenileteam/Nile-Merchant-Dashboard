import { useState } from "react";
import { Link } from "react-router-dom";
import Links from "../Links";
import {
  image,
  nilelogowhite,
  notification,
  store1,
  accountsetting,
  arrow,
  store,
  dollar,
  profile,
  notification2,
  bank,
  invoice,
  containertruck,
  websecurity,
} from "../assets";
import DeleteAccount from "../Components/Store/DeleteAccount";
import {useFetchUser} from '../datahooks/users/userhooks'
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import Navbar from '../Components/Navbar/Navbar'
import StoreSetting from "../Components/Store/StoreSetting";
const Store = () => {
  const { user } = useFetchUser()
  const { isCollapsed } = useSidebarStore()
    return (
    <>
      <div className="bg-[#F5F5F5] pb-20">
        <div className="flex">
         {/* <Sidebar /> */}

          {/* Navbar */}
          <div   className={
              isCollapsed
                ? "flex-grow lg:ml-20 overflow-x-hidden"
                : "flex-grow lg:ml-56 overflow-x-hidden"
            }>
             <Navbar  title="Store Information"
              icon={store}
              profilePic={user && user.image ? user.image : ""}/>
            {/* Cards */}
              <StoreSetting />
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
