import { arrowleft, logout, profileimage } from "../../assets";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import UploadImage from "../UploadImage/UploadImage";
import {
  useFetchUser,
  useLogOut,
  useModifyProfile,
} from "../../datahooks/users/userhooks";
import ProfileImage from "../PlaceholderImage/PlaceholderImage";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Sheet, SheetTrigger } from "../ui/sheet";
import AcccountNumberComp from "./AcccountNumberComp";
import useBankDetails from "@/datahooks/banks/usebankhook";

const ProfileSetting = () => {
  const { dbBanks } = useBankDetails();
  const { user, isFetchingUser, isError } = useFetchUser();

  const [phoneNumber, setPhoneNumber] = useState(
    (user && user.phoneNumber) || ""
  );
  const { mutate } = useLogOut();
  const { modifyProfile, isPending } = useModifyProfile();
  const [image, setImage] = useState(null);
  const [cancelMessage, setCancelMessage] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const username = user && user.name ? user.name : "User";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const validExtensions = /\.(jpg|jpeg|png|svg)$/i;
    if (!validExtensions.test(file.name)) {
      alert("Invalid file type. Please upload a JPG, PNG, SVG, or JPEG image.");
      return;
    }
    setImage(file);
  };

  const cancelChanges = () => {
    if (user) {
      setImage(user.image);
      setPhoneNumber(user.phoneNumber);
      if (user.image !== image || user.phoneNumber !== phoneNumber) {
        setCancelMessage("Changes canceled!");
      } else {
        setCancelMessage("You didn't make any new changes");
      }
      // Set the timeout and store the ID
      const id = setTimeout(() => setCancelMessage(""), 3000);
      setTimeoutId(id);
    }
  };

  // Cleanup the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId); // Clears the timeout on component unmount
      }
    };
  }, [timeoutId]);

  const handleSaveChanges = async () => {
    if (!image || !phoneNumber) {
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
                <img src={arrowleft} alt="Back to Dashboard" loading="lazy" />
              </Link>
              <h1 className="text-[32px] font-bold">Profile Settings</h1>
            </div>
            <div className="flex items-center gap-10 ml-[500px]">
              {/* <div>
                <Link to="/notification">
                  <img src={notification} alt="Notifications" />
                </Link>
              </div> */}
              <div>
                <Link to="/profilesetting">
                  <ProfileImage
                    profileImage={user && user.image ? user.image : ""}
                  />
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
      <div className="relative">
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
                  className=" cursor-pointer shrink-0 rounded-full object-cover w-[100px] h-[100px]"
                  alt="User Image"
                />
                {/* <button className="block border-0 mx-auto font-bold" onClick={handleRemoveFile}>remove image &times;</button> */}
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
              style="w-[100px] h-[100px] object-cover rounded-full mx-auto"
              labelFor={"fileInput"}
              parentStyle="mt-10"
            />
          )}
        </div>
        <div className="sm:flex flex-col w-fit mx-auto sm:justify-end">
          <form action="#" className="px-4 lg:px-0">
            <div className="mt-4">
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
                placeholder={"Ahmad Diallo"}
                value={username}
                className="mt-1 w-full sm:w-[450px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm cursor-not-allowed"
                readOnly
              />
            </div>
            <div className="mt-4">
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
                value={user && user.email ? user.email : ""}
                className="mt-1  w-full sm:w-[450px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm cursor-not-allowed"
                readOnly
              />
            </div>
            <div className="mt-4">
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
                  pattern="\d{11}"
                  maxLength="11"
                  title="Phone number must be exactly 11 digits"
                  className="mt-1 w-full sm:max-w-[450px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                />
              )}
            </div>
          </form>
          {/* bank details */}
          <Sheet>
            {dbBanks && (
              <SheetTrigger className=" bg-green mt-10 w-full px-5 py-3 text-white rounded-md ">
                {dbBanks && dbBanks.length > 0
                  ? "Update Bank Settings"
                  : "Add Bank Details"}
              </SheetTrigger>
            )}

            <AcccountNumberComp />
          </Sheet>
        </div>
        <div className="flex items-center justify-center gap-4  md:gap-16 mt-10 px-4 md:px-0">
          <button
            className="border-[#004324] border-2 text-[#004324] font-bold p-3 rounded-lg max-w-[192px] text-sm"
            onClick={cancelChanges}
          >
            Cancel Changes
          </button>

          <button
            disabled={isPending}
            onClick={() => {
              handleSaveChanges();
            }}
            className="border-[#004324] disabled:bg-opacity-40 border-2 text-[#ffffff] bg-[#004324] font-bold p-3 rounded-lg max-w-[192px] text-sm"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
        {/* Log Out Button */}

        <button
          onClick={() => {
            console.log("Log out");
            mutate();
          }}
          className="flex cursor-pointer items-center float-right mt-6 px-16"
        >
          <img src={logout} alt="" />
          <h1 className="text-[#DC3545] font-bold">Log Out</h1>
        </button>
        {cancelMessage && (
          <p className="text-xl text-center my-4 shadow-sm bg-pry2 transitions">
            {cancelMessage}
          </p>
        )}
      </div>
    </>
  );
};

export default ProfileSetting;
