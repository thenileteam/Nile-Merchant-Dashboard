import React from "react";
import {
  addlogo,
  arrowleft,
  coverimage,
  image,
  notification,
} from "../../assets";
import { Link } from "react-router-dom";
import SaveChanges from "../Popup Modals/SaveChanges";

const StoreSetting = () => {
  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="bg-[#EAF4E2] p-4 shadow-md flex items-center justify-center gap-5 fixed w-full">
          <div className="flex items-center justify-between gap-20">
            <div className="flex items-center gap-2">
              <Link to="/store">
                <img src={arrowleft} alt="" />
              </Link>
              <h1 className="text-[32px] font-bold">Store Settings</h1>
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
      <br />

      {/* Input Fields */}
      <div className="flex items-center justify-center gap-28 px-28">
        <form
          action="#"
          className="space-y-5 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[338px] p-4 rounded-lg"
        >
          <div>
            <label
              htmlFor="StoreName"
              className="block text-[16px] font-bold text-[#333333]"
            >
              Store Name
            </label>

            <input
              type="text"
              id="StoreName"
              name="store_name"
              placeholder="E.g;Gade’s store"
              className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="StoreName"
              className="text-[16px] font-bold text-[#333333] flex items-center"
            >
              Store Details{" "}
              <span>
                <h1 className="text-gray-500 font-normal text-sm">
                  (This will be in your about page)
                </h1>
              </span>
            </label>

            <input
              type="text"
              id="StoreName"
              name="store_name"
              placeholder="Enter it here"
              className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="StoreName"
              className="text-[16px] font-bold text-[#333333] flex items-center"
            >
              Store Address{" "}
              <span>
                <h1 className="text-gray-500 font-normal text-sm">
                  (This will be where to pickup)
                </h1>
              </span>
            </label>

            <input
              type="text"
              id="StoreName"
              name="store_name"
              placeholder="Enter it here"
              className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="StoreName"
              className="block text-[16px] font-bold text-[#333333]"
            >
              Store URL
            </label>

            <input
              type="text"
              id="StoreName"
              name="store_name"
              placeholder="Enter it here"
              className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
        </form>

        <form
          action="#"
          className="space-y-5 bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg"
        >
          <div>
            <label
              htmlFor="StoreName"
              className="block text-[16px] font-bold text-[#333333]"
            >
              Facebook Link
            </label>

            <input
              type="text"
              id="StoreName"
              name="store_name"
              placeholder="https//:wwww.facebook.com/Mynile.store"
              className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="StoreName"
              className="text-[16px] font-bold text-[#333333]"
            >
              Intagram Link
            </label>

            <input
              type="text"
              id="StoreName"
              name="store_name"
              placeholder="https//:wwww.instagram.com/Mynile.store"
              className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="StoreName"
              className="text-[16px] font-bold text-[#333333] flex items-center"
            >
              Twitter Link
            </label>

            <input
              type="text"
              id="StoreName"
              name="store_name"
              placeholder="https//:wwww.x.com/Mynile.store"
              className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div>
            <label
              htmlFor="StoreName"
              className="block text-[16px] font-bold text-[#333333]"
            >
              LinkedIn Link
            </label>

            <input
              type="text"
              id="StoreName"
              name="store_name"
              placeholder="https//:wwww.linkedin.com/Mynile.store"
              className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div>
            <h1 className="text-[16px] font-bold text-[#333333]">
              Primary Color{" "}
              <span className="text-gray-500 text-sm">
                (This will appear at most important call to actions buttons)
              </span>
            </h1>
            <div className="flex items-center gap-1">
              <h1 className="bg-[#004324] p-3 rounded-full w-fit border-[#8ED06C] border-2"></h1>
              <input
                type="text"
                id="StoreName"
                name="store_name"
                placeholder="Enter Hex Code"
                className="mt-1 w-[128px] p-2 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
              <p className="text-[#33333] font-bold">Or</p>
              <input
                type="text"
                id="StoreName"
                name="store_name"
                placeholder="Enter Color Name"
                className="mt-1 w-[140px] p-2 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
          </div>
        </form>

        <form
          action="#"
          className="space-y-5 bg-[#EAF4E2] border-[#8ED06C] border-2 w-fit p-5 rounded-lg"
        >
          <div>
            <h1 className="text-[16px] font-bold text-[#333333]">
              Store Logo{" "}
              <span className="text-gray-500 font-normal text-sm">
                (This will appear at the top of your <br /> website)
              </span>
            </h1>
            <img
              src={addlogo}
              alt=""
              className="border-dashed border-2 border-gray-400 mt-2"
            />
          </div>
          <div>
            <h1 className="text-[16px] font-bold text-[#333333]">
              Cover Image{" "}
              <span className="text-gray-500 font-normal text-sm">
                (This will appear at the top under <br /> the store headline
                like an hero image and add up to <br /> two images)
              </span>
            </h1>
            <img
              src={coverimage}
              alt=""
              className="border-dashed border-2 border-gray-400 mt-2"
            />
          </div>
          <div>
            <label
              htmlFor="StoreName"
              className="block text-[16px] font-bold text-[#333333]"
            >
              Store Headline{" "}
              <span className="text-gray-500 text-sm font-normal">
                (This will be on the hero image)
              </span>
            </label>

            <input
              type="text"
              id="StoreName"
              name="store_name"
              placeholder="Enter it here"
              className="mt-1 w-[304px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
        </form>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-center mt-10">
        <SaveChanges />
      </div>
    </>
  );
};

export default StoreSetting;
