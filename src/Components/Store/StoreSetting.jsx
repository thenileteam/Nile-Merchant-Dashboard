import React from "react";
import {
  arrowleft,
  coverimage,
  image,
  notification,
  addImage,
} from "../../assets";
import SaveChanges from "../PopupModals/SaveChanges";
import UploadImage from "../UploadImage/UploadImage";
const StoreSetting = () => {
  return (
    <>
      <div className="mt-20">
        {/* Input Fields */}
        <div className=" lg:max-w-[1000px] mx-auto">
          <form
            action="#"
            className="flex justify-center gap-28" 
          >
            {/* first child */}
            <div className="space-y-5 bg-[#EAF4E2] border-[#8ED06C] border-2 max-w-[338px] p-4 rounded-lg">
              <div>
                <label
                  htmlFor="store-logo"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  Store Logo
                </label>
                <UploadImage
                  image={addImage}
                  style="w-[185px] mx-0"
                  parentStyle="mt-2"
                  labelFor="logo-upload"
                />
              </div>
              <div>
                <label
                  htmlFor="store-logo"
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
                  htmlFor="store-country"
                  className="text-[16px] font-bold text-[#333333] flex items-center"
                >
                  Country
                </label>

                <input
                  type="text"
                  id="store-country"
                  name="store-country"
                  placeholder="Enter it here"
                  className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="store-state"
                  className="text-[16px] font-bold text-[#333333] flex items-center"
                >
                  State
                </label>

                <input
                  type="text"
                  id="store-state"
                  name="store-state"
                  placeholder="Enter it here"
                  className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="store-city"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  City
                </label>

                <input
                  type="text"
                  id="store-city"
                  name="store-city"
                  placeholder="Enter it here"
                  className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
            </div>
            {/* second form */}
            <div className=" bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg">
              <div>
                <label
                  htmlFor="facebook"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  Facebook Link
                </label>

                <input
                  type="text"
                  id="facebook"
                  name="facebook"
                  placeholder="https//:wwww.facebook.com/Mynile.store"
                  className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="StoreName"
                  className="text-[16px] font-bold text-[#333333]"
                >
                  Instagram Link
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
                  htmlFor="linkedIn-link"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  LinkedIn Link
                </label>

                <input
                  type="text"
                  id="linkedIn-link"
                  name="linkedIn-link"
                  placeholder="https//:wwww.linkedin.com/Mynile.store"
                  className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>
              <div className="text-[#333] font-semibold">
                Store Currency
                <div className="border-2 border-[#8ED06C] rounded-md flex justify-between p-2">
                  <label htmlFor="">USD</label>
                  <input type="checkbox" name="" id="" />
                </div>
                <div className="border-2 border-[#8ED06C] mt-2 rounded-md flex justify-between p-2">
                  <label htmlFor="usd-currency">NAIRA</label>
                  <input type="checkbox" name="" id="" />
                </div>
              </div>
            </div>
          </form>

          {/* <form
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
        </form> */}
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-center mt-10">
          <SaveChanges />
        </div>
      </div>
    </>
  );
};

export default StoreSetting;
