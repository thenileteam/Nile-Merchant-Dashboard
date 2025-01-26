import React from "react";
import { useSidebarStore } from "../ZustandStores/sidebarStore";
import Navbar from "@/Components/Navbar/Navbar";
import { trolley } from "@/assets";
import { useFetchUser } from "@/datahooks/users/userhooks";
const DomainMangaement = () => {
  const { user } = useFetchUser();
  const { sidebarOpen, setSidebarOpen, closeSidebar, isCollapsed } =
    useSidebarStore();
  return (
    <div
      className={
        isCollapsed
          ? "flex-grow lg:ml-20 overflow-x-hidden"
          : "flex-grow lg:ml-56 overflow-x-hidden"
      }
    >
      <Navbar
        title="Domain Management"
        icon={""}
        profilePic={user && user.image ? user.image : ""}
      />

      <div
        style={{
          marginTop: "112px",
          paddingLeft: "71px",
        }}
        className="flex flex-col gap-4 bg-red-400 "
      >
        <div className="flex mb-8 gap-4">
          <button className=" flex gap-1 items-center bg-green font-bold   text-[14px] tracking-[1%]  leading-[18px] text-white px-4 py-2 rounded-lg">
            <img src="/public/plus.svg" alt="plus icon" /> Get Custom Domain
          </button>
          <button
            style={{
              border: "2px solid #8ED06C",
            }}
            className=" flex gap-1 items-center bg-white font-bold   border-[2px] border-[#8ED06C] text-[14px] tracking-[1%]  leading-[18px] text-[#8ED06C] px-4 py-2 rounded-lg"
          >
            Connect Domain
          </button>
        </div>

        <div className=" bg-[#EAF4E2] rounded-lg px-10 py-8 flex flex-col gap-2">
          <h1 className=" text-[16px] font-bold">Your Nile Store URL</h1>
          <p className=" text-[14px] font-normal">
            https://www.nile.store/store/1234567890
          </p>
        </div>
      </div>
    </div>
  );
};

export default DomainMangaement;
