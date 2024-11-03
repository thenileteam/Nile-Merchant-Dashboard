import React from "react";
import { arrowleft, image, notification, roundedimage } from "../../assets";
import { Link } from "react-router-dom";
import SaveChanges from "../Popup Modals/SaveChanges";
import SendInvite from "../Popup Modals/SendInvite";

const UserSetting = () => {
  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="bg-[#EAF4E2] p-4 shadow-md flex items-center justify-center gap-5 fixed w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link to="/store">
                <img src={arrowleft} alt="" />
              </Link>
              <h1 className="text-[32px] font-bold">
                User & Permission Settings
              </h1>
            </div>
            <div className="flex items-center gap-10 ml-[525px]">
              <div className="relative">
                <label htmlFor="Search" className="sr-only">
                  {" "}
                  Search{" "}
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
                  <img src={notification} alt="" />
                </Link>
              </div>
              <div>
                <Link to="/profilesetting">
                  <img src={image} alt="" />
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

      {/* Input Fields */}
      <div className="flex px-28 gap-28 justify-center mx-auto">
        <div>
          <form
            action="#"
            className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[375px] p-4 rounded-lg"
          >
            <div>
              <h1 className="text-[20px] text-[#004324] font-bold">
                Store Owner
              </h1>
              <p className="text-[#6E6E6E] text-sm">
                Last Login was Day,Month 9,Year 10:25pm
              </p>
            </div>
            <div className="flex items-center gap-2 ml-6">
              <img src={roundedimage} alt="" />
              <h1 className="text-[#6E6E6E] text-[20px] font-bold">
                Ahmad Diallo
              </h1>
            </div>
          </form>
          <div>
            <p className="text-[#6E6E6E] text-sm text-center">
              You Can Add Up To 3 Admin and manage what they <br /> should be
              able to do on your store
            </p>
          </div>

          <form
            action="#"
            className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg"
          >
            <div>
              <h1 className="text-[20px] text-[#333333] font-bold">
                Admin Name
              </h1>
              <input
                type="text"
                className="w-full p-2 rounded-sm placeholder:text-sm"
                placeholder="Mary Daniel"
              />
              <p className="text-[#6E6E6E] text-sm">
                Last Login was Day,Month 9,Year 10:25pm
              </p>
            </div>
            <div className="space-y-3">
              <div>
                <h1 className="text-[#004324] text-[16px] font-bold">
                  Permission
                </h1>
                <p className="text-[#6E6E6E] text-sm">
                  Choose What The Admin Should Be Able To Access
                </p>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Product
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Orders & Shipping
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Review & Ratings
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Customers Management
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Financial Management
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <SaveChanges />
            </div>
          </form>
        </div>

        <div>
          <form
            action="#"
            className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg"
          >
            <div>
              <h1 className="text-[20px] text-[#333333] font-bold">
                Admin Name
              </h1>
              <input
                type="text"
                className="w-full p-2 rounded-sm placeholder:text-sm"
                placeholder="Mary Daniel"
              />
              <p className="text-[#6E6E6E] text-sm">
                Last Login was Day,Month 9,Year 10:25pm
              </p>
            </div>
            <div className="space-y-3">
              <div>
                <h1 className="text-[#004324] text-[16px] font-bold">
                  Permission
                </h1>
                <p className="text-[#6E6E6E] text-sm">
                  Choose What The Admin Should Be Able To Access
                </p>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Product
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Orders & Shipping
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Review & Ratings
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Customers Management
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Financial Management
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <SaveChanges />
            </div>
          </form>
        </div>

        <div className="mb-10">
          <form
            action="#"
            className="space-y-3 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg"
          >
            <div className="space-y-2">
              <h1 className="text-[16px] text-[#333333] font-bold">
                Admin Name
              </h1>
              <input
                type="text"
                className="w-full p-2 rounded-sm placeholder:text-sm"
                placeholder="Enter the Admin Name.E.g;Farouq Kola"
              />

              <h1 className="text-[16px] text-[#333333] font-bold">Email</h1>
              <input
                type="text"
                className="w-full p-2 rounded-sm placeholder:text-sm"
                placeholder="E.g;Farkola@gmail.com"
              />

              <h1 className="text-[16px] text-[#333333] font-bold">Phone</h1>
              <input
                type="text"
                className="w-full p-2 rounded-sm placeholder:text-sm"
                placeholder="E.g;07000000000"
              />

              <h1 className="text-[16px] text-[#333333] font-bold">
                Admin Password
              </h1>
              <input
                type="text"
                className="w-full p-2 rounded-sm placeholder:text-sm"
                placeholder="Input a pasword the admin will use to login"
              />
            </div>
            <div className="space-y-3">
              <div>
                <h1 className="text-[#004324] text-[16px] font-bold">
                  Permission
                </h1>
                <p className="text-[#6E6E6E] text-sm">
                  Choose What The Admin Should Be Able To Access
                </p>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Product
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Orders & Shipping
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Review & Ratings
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Customers Management
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between bg-[#ffffff] border-[#8ED06C] border-2 p-2 rounded-md">
                <div>
                  <h1 className="text-gray-500 font-bold text-[16px]">
                    Financial Management
                  </h1>
                  <p className="text-[#6E6E6E] text-sm">
                    Will be able to perform action on this page
                  </p>
                </div>
                <div className="flex items-center">
                  &#8203;
                  <input
                    type="checkbox"
                    className="size-4 rounded border-gray-300"
                    id="Option2"
                  />
                </div>
              </div>
            </div>
            {/* Send Invite Button */}
            <div className="flex justify-center mt-10">
              <SendInvite />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserSetting;
