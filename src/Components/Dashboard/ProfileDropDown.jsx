import { Link } from "react-router-dom";
import { logout, accountsetting, idea } from "../../assets";
import { useLogOut } from "@/datahooks/users/userhooks";
import { useProfileStore } from "@/ZustandStores/profileStore";
const ProfileDropDown = () => {
  const { mutate } = useLogOut();
    const { isProfileOpen } = useProfileStore();
    
  return (
    <>
      <div
        className={
          isProfileOpen
            ? "visible fixed top-20 right-5 bg-white rounded-md transitions"
            : "invisible fixed top-20 right-3 bg-white"
        }
      >
        <div className="text-lightBlack font-semibold p-2">
          <Link to="/profilesetting">
            <button type="button" className="w-full flex items-center gap-1 p-2 hover:bg-zinc-100 transitions">
              <img src={accountsetting} className='w-5' alt="settings" />
              <span>Profile Settings</span>
            </button>
          </Link>
          <button
            type="button"
            className="my-2 flex items-center gap-1 p-2  w-full hover:bg-zinc-100 transitions"
          >
            <img src={idea}  className='w-5' alt="light bulb" />
            <span className="">Dashboard Walkthrough</span>
          </button>
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
