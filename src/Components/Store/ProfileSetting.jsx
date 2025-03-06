import { arrowleft, logout, profileimage } from "../../assets";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import UploadImage from "../UploadImage/UploadImage";
import {
  useFetchUser,
  useLogOut,
  useModifyProfile,
} from "../../datahooks/users/userhooks";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Sheet, SheetTrigger } from "../ui/sheet";
import AcccountNumberComp from "./AcccountNumberComp";
import useBankDetails from "@/datahooks/banks/usebankhook";
import { useSidebarStore } from "@/ZustandStores/sidebarStore";
import EnableEdit from "./EnableEdit";
import DashboardIntro from "../Dashboard/DashboardIntro";
import { useEnableEdit } from "@/ZustandStores/enableEdit";
const ProfileSetting = () => {
  const { isCollapsed } = useSidebarStore();
  const { dbBanks } = useBankDetails();
  const { user, isFetchingUser, isError } = useFetchUser();
  const { buttonStates, disableEditMode } = useEnableEdit();
  const [phoneNumber, setPhoneNumber] = useState(
    (user && user.phoneNumber) || ""
  );
  const { mutate } = useLogOut();
  const { modifyProfile, isPending } = useModifyProfile();
  const [image, setImage] = useState(null);
  const [cancelMessage, setCancelMessage] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const username = user && user.name ? user.name : "User";
  console.log(buttonStates.profile.editMode);
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
      setImage(user?.image);
      setPhoneNumber(user?.phoneNumber);
      if (user?.image !== image || user?.phoneNumber !== phoneNumber) {
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
      <p className="">No changes made!</p>;
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

  if (isError)
    return (
      <div className="mx-auto flex justify-center items-center text-red-500 h-screen text-2xl font-bold capitalize max-w-[400px] tex-center">
        <p>
          Error fetching profile details <br /> please try refreshing
        </p>
      </div>
    );

  return (
    <>
      <section>
        <div
          className={`
            ${
              isCollapsed
                ? "flex-grow lg:ml-20 overflow-x-hidden"
                : "flex-grow lg:ml-56 overflow-x-hidden"
            }
          `}
        >
          <div className={` lg:max-w-[800px] mt-[73px] mb-6 mx-auto`}>
            <article className="flex justify-between lg:items-center p-3">
              <DashboardIntro
                introText={
                  buttonStates.profile.editMode ? "Edit Mode" : "Profile"
                }
              />
              <EnableEdit text=" Profile" buttonKey="profile" />
            </article>
            {/* Input Fields */}
            <div className="relative bg-white rounded-md shadow-lg border mt-8 p-3">
              <h3 className="bg-[#f5f5f5] p-2 font-[500px]">Profile Picture</h3>
              <div className="flex my-6">
                {isFetchingUser ? (
                  <Skeleton className=" size-[100px] rounded-full" />
                ) : user?.image ? (
                  <>
                    <label
                      className=" border size-[100px] my-6 border-zinc-500 rounded-full shrink-0"
                      htmlFor="fileInput"
                    >
                      {" "}
                      <img
                        src={user?.image}
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
                    style="w-full object-cover rounded-lg"
                    labelFor={"fileInput"}
                    parentStyle=" "
                  />
                )}
              </div>
              <div className="">
                <h3 className="  bg-[#f5f5f5] p-2 font-[500px]">
                  Personal Information
                </h3>
                <form action="#" className="px-2">
                  <div className="mt-2">
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
                      className="mt-1 w-full p-3 rounded-md border-lightBlack border bg-white text-sm text-gray-700 shadow-sm cursor-not-allowed"
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
                      className="mt-1  w-full p-3 rounded-md border-lightBlack border bg-white text-sm text-gray-700 shadow-sm cursor-not-allowed"
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
                        className={`mt-1 w-full p-3 rounded-md border-lightBlack border bg-white text-sm text-gray-700 shadow-sm ${
                          buttonStates.profile.editMode
                            ? ""
                            : "cursor-not-allowed"
                        } `}
                        readOnly={!buttonStates.profile.editMode}
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
              <div className="flex justify-end gap-4 md:gap-8 py-6 pr-4 md:px-0">
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
                    disableEditMode("profile");
                  }}
                  className="border-[#004324] disabled:bg-opacity-40 border-2 text-[#ffffff] bg-[#004324] font-bold p-3 rounded-lg max-w-[192px] text-sm"
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>

              {/* Log Out Button */}
              {/* <button
                onClick={() => {
                  console.log("Log out");
                  mutate();
                }}
                className="flex cursor-pointer items-center float-right mt-6 px-16"
              >
                <img src={logout} alt="log out button" />
                <h1 className="text-[#DC3545] font-bold">Log Out</h1>
              </button> */}
              {cancelMessage && (
                <p className="text-xl text-center my-4 shadow-sm bg-pry2 transitions">
                  {cancelMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProfileSetting;
