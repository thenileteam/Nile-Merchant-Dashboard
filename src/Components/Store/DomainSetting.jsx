import { arrowleft, image, notification } from "../../assets";
import Navbar from "../Navbar/Navbar";
import { useFetchUser } from "@/datahooks/users/userhooks";
import { useSidebarStore } from "@/ZustandStores/sidebarStore";
import AddDomain from "../PopupModals/AddDomain";
import ConnectDomain from "../PopupModals/ConnectDomain";
const DomainSetting = () => {
  const { user } = useFetchUser();
  const { isCollapsed } = useSidebarStore();
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
        profilePic={user && user.image ? user.image : ""}
      />
      {/* main body */}
      <section className={`mx-auto mt-28 ${isCollapsed?"max-w-[1000px]":'max-w-[820px]'}`}>
        {/* pop up buttons */}
        <div className="mb-4 flex gap-2 font-bold ">
          <AddDomain/>
          <ConnectDomain/>
        </div>
        {/* domain components */}
        <article className="bg-[#EAF4E2] border-lightGreen border px-3 py-2 mb-4 rounded-md">
          <h3 className="text-lightBlack font-bold">Your Nile store URL</h3>
          <form className="p-2 bg-white max-w-[270px] flex gap-1 rounded-md">
            <input type="text" placeholder="www.something.nile.store" />
            <button
              type="button"
              className="font-bold text-white bg-green w-[60px] py-1 rounded-md"
            >
              Save
            </button>
          </form>
        </article>
        <article className="bg-[#EAF4E2] border-lightGreen border px-3 py-2 rounded-md">
          <h3 className="text-lightBlack font-bold">Your custom store URL</h3>
          <p className="bg-white p-1 my-2 text-lightGreen max-w-[150px]">
            www.something.ng
          </p>
        </article>
      </section>
    </div>
  );
};

export default DomainSetting;
