import { arrowleft, logout, notification, profileimage } from "../../assets";
import { Link } from "react-router-dom";
import UploadImage from "../UploadImage/UploadImage";
import {
  useFetchUser,
  useLogOut,
  useModifyProfile,
} from "../../datahooks/users/userhooks";
import PlaceholderImage from "../PlaceholderImage/PlaceholderImage";
import { useUserStore } from "../../zustandStore";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

const ProfileSetting = () => {
  const { user, isFetchingUser, isError } = useFetchUser();
  const [phoneNumber, setPhoneNumber] = useState(
    (user && user.phoneNumber) || ""
  );
  const { mutate } = useLogOut();
  const { modifyProfile, isPending } = useModifyProfile();
  const [image, setImage] = useState(null);
  const username = useUserStore((state) => state.username);
  console.log(user);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleSaveChanges = async () => {
    if (!image && !phoneNumber) {
      console.error("No changes made!");
      return;
    }

    const formData = new FormData();
    if (image) formData.append("image", image);
    if (phoneNumber) formData.append("phoneNumber", phoneNumber);

    try {
      modifyProfile(formData);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (isError) return <div>Something went wrong</div>;

  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="bg-[#EAF4E2] p-4 shadow-md flex items-center justify-center gap-5 fixed z-50 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-20">
              <Link to="/dashboard">
                <img src={arrowleft} alt="Back to Dashboard" />
              </Link>
              <h1 className="text-[32px] font-bold">Profile Settings</h1>
            </div>
            <div className="flex items-center gap-10 ml-[500px]">
              <div className="relative">
                <label htmlFor="Search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="Search"
                  placeholder=""
                  className="w-[300px] rounded-md border-[#6E6E6E] border-2 p-8 py-2.5 pe-10 shadow-sm sm:text-sm"
                />
                <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-700"
                  >
                    <span className="sr-only">Search</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              <div>
                <Link to="/notification">
                  <img src={notification} alt="Notifications" />
                </Link>
              </div>
              <div>
                <Link to="/profilesetting">
                  <PlaceholderImage />
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* Input Fields */}
      <div>
        <div className="flex justify-center mx-auto w-[200px] h-[200px] rounded-full">
          {isFetchingUser ? (
            <Skeleton className=" size-[100px] rounded-full" />
          ) : user.image ? (
            <>
              <label
                className=" border size-[100px] mt-10 border-zinc-500 rounded-full shrink-0"
                htmlFor="fileInput"
              >
                {" "}
                <img
                  src={user.image}
                  className=" cursor-pointer shrink-0 rounded-full object-cover"
                  alt="User Image"
                />
              </label>
              <input
                type="file"
                name="fileInput"
                id="fileInput"
                accept=".jpg,.png,.jpeg"
                className=" hidden"
                required
                onChange={handleFileChange}
              />
            </>
          ) : (
            <UploadImage
              image={profileimage}
              handleFileChange={handleFileChange}
              style="w-[120px] h-[120px] object-cover rounded-full"
            />
          )}
        </div>
        <div className="flex justify-center">
          <form action="#" className="space-y-5">
            <div>
              <label
                htmlFor="Name"
                className="block text-[16px] font-bold text-[#333333]"
              >
                Name
              </label>
              <input
                type="text"
                id="Name"
                name="name"
                placeholder={`${username || "Ahmad Diallo"}`}
                className="mt-1 w-[450px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm cursor-not-allowed"
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="EmailAddress"
                className="block text-[16px] font-bold text-[#333333]"
              >
                E-Mail
              </label>
              <input
                type="email"
                id="EmailAddress"
                name="email_address"
                placeholder="Ashimiuade@gmail.com"
                className="mt-1 w-[450px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm cursor-not-allowed"
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="PhoneNumber"
                className="block text-[16px] font-bold text-[#333333]"
              >
                Phone Number
              </label>
              {isFetchingUser ? (
                <Skeleton className=" w-[450px] py-2 rounded-md " />
              ) : (
                <input
                  type="text"
                  id="PhoneNumber"
                  value={phoneNumber}
                  name="phone_number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="0000000000000"
                  className="mt-1 w-[450px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                />
              )}
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center gap-16 mt-10">
          <button className="border-[#004324] border-2 text-[#004324] font-bold p-3 rounded-lg w-[192px]">
            Cancel Changes
          </button>
          <button
            disabled={isPending}
            onClick={() => {
              handleSaveChanges();
            }}
            className="border-[#004324] disabled:bg-opacity-40 border-2 text-[#ffffff] bg-[#004324] font-bold p-3 rounded-lg w-[192px]"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
        {/* Log Out Button */}

        <div
          onClick={() => {
            console.log("Log out");
            mutate();
          }}
          className="flex cursor-pointer items-center justify-end px-36"
        >
          <img src={logout} alt="" />
          <h1 className="text-[#DC3545] font-bold">Log Out</h1>
        </div>
      </div>
    </>
  );
};

export default ProfileSetting;
