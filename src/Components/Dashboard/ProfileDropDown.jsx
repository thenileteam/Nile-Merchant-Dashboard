import { Link } from "react-router-dom";
import { logout, accountsetting, idea } from "../../assets";
import { useLogOut } from "@/datahooks/users/userhooks";
import { useProfileStore } from "@/ZustandStores/profileStore";
import Walkthrough from "../PopupModals/WalkThrough";
const ProfileDropDown = () => {
  const { mutate } = useLogOut();
    const { isProfileOpen } = useProfileStore();
    
  return (
    <>
      <div
        className={
          isProfileOpen
            ? "visible absolute top-16 right-3 bg-white rounded-md transitions w-[200px] shadow-md"
            : "invisible absolute top-16 right-2 bg-white"
        }
      >
        <div className="text-lightBlack font-semibold p-2">
          <Link to="/profilesetting">
            <button type="button" className="w-full flex items-center gap-1 p-2 hover:bg-zinc-100 transitions">
              <img src={accountsetting} className='w-5' alt="settings" />
              <span>Profile Settings</span>
            </button>
          </Link>
          
          <Walkthrough/>
          <button type="button" className="w-full flex gap-1 items-center p-2 hover:bg-zinc-100 " onClick={() => mutate()}>
            <img src={logout} className='w-5' alt="logout" />
            <span className="text-red-500  ">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileDropDown;
