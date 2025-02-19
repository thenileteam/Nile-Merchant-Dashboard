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
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import StoreSetting from "../Components/Store/StoreSetting";
const Store = () => {
  const { isCollapsed } = useSidebarStore()
    return (
    <>
      <div className=" pb-20">
        <div className="flex">
          <div  className={
              isCollapsed
                ? "flex-grow lg:ml-20 overflow-x-hidden"
                : "flex-grow lg:ml-56 overflow-x-hidden"
            }>
            {/* setting form */}
              <StoreSetting />
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;
