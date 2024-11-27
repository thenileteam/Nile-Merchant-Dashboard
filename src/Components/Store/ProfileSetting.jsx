import { arrowleft, logout, notification, profileimage } from "../../assets";
import { Link } from "react-router-dom";
import UploadImage from "../UploadImage/UploadImage";
import { useLogOut } from "../../datahooks/users/userhooks";
import PlaceholderImage from "../PlaceholderImage/PlaceholderImage";
const ProfileSetting = () => {
  const { mutate } = useLogOut();
  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="bg-[#EAF4E2] p-4 shadow-md flex items-center justify-center gap-5 fixed w-full">
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
          <UploadImage
            image={profileimage}
            style="w-[120px] h-[120px] object-cover rounded-full"
          />
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
                placeholder="Ahmad Diallo"
                className="mt-1 w-[450px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
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
                className="mt-1 w-[450px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="PhoneNumber"
                className="block text-[16px] font-bold text-[#333333]"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="PhoneNumber"
                name="phone_number"
                placeholder="0000000000000"
                className="mt-1 w-[450px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="Password"
                className="block text-[16px] font-bold text-[#333333]"
              >
                Password
              </label>
              <input
                type="password"
                id="Password"
                name="password"
                placeholder="0000000000000"
                className="mt-1 w-[450px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center gap-16 mt-10">
          <button className="border-[#004324] border-2 text-[#004324] font-bold p-3 rounded-lg w-[192px]">
            Cancel Changes
          </button>
          <button className="border-[#004324] border-2 text-[#ffffff] bg-[#004324] font-bold p-3 rounded-lg w-[192px]">
            Save Changes
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
