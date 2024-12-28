import { validateForm } from "@/utils/formatdate";
import { coverimage, addlogo, addImage } from "../../assets";
import SaveChanges from "../PopupModals/SaveChanges";
import UploadImage from "../UploadImage/UploadImage";
import {
  useEditStoreSettings,
  useFetchStoreSettings,
} from "@/datahooks/users/storeSettings";
import { useState, useEffect } from "react";
const StoreSetting = () => {
  const { data } = useFetchStoreSettings();
  const { isEditingStore, addStoreSettingsToBackend } = useEditStoreSettings();
  const [storeSettingDetails, setStoreSettingDetails] = useState({
    name: "",
    city: "",
    country: "",
    logo: "",
    state: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    currency: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    if (data) {
      setStoreSettingDetails({
        name: data.name || "",
        city: data.city || "",
        country: data.country || "",
        logo: data.logo || "",
        state: data.state || "",
        facebook: data.facebook || "",
        instagram: data.instagram || "",
        linkedin: data.linkedin || "",
        twitter: data.twitter || "",
        currency: data.currency || "",
      });
    }
  }, [data]);

  const handleChangeStoreInfo = (e) => {
    const { name, type, value, checked } = e.target;
    setStoreSettingDetails((prevData) => ({
      ...prevData,
      [name]: type === "radio" ? (checked ? value : prevData[name]) : value,
    }));
  };

  const handleSubmitStoreInfo = () => {
    const requiredFields = [
      "name",
      "facebook",
      "instagram",
      "linkedin",
      "country",
      "currency",
    ];
    try {
      const {
        name,
        currency,
        country,
        city,
        state,
        logo,
        facebook,
        instagram,
        linkedin,
        twitter,
      } = storeSettingDetails;
      const newData = {
        name,
        currency,
        country,
        city,
        state,
        logo,
        facebook,
        instagram,
        linkedin,
        twitter,
      };
      if (!validateForm(requiredFields, storeSettingDetails)) return;
      addStoreSettingsToBackend(newData, {
        onSuccess: () => {
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 500);
        },
        onError: (error) => {
          console.error("Error saving store settings:", error);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="mt-20">
        {/* Input Fields */}
        <div className=" lg:max-w-[1000px] mx-auto">
          <form action="#" className="flex justify-center gap-28">
            {/* first child */}
            <div className="space-y-5 bg-[#EAF4E2] border-[#8ED06C] border-2 max-w-[338px] p-4 rounded-lg">
              {/* <div>
                <label
                  htmlFor="logo"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  Store Logo
                </label>
                <UploadImage
                  image={addImage}
                  style="w-[185px] mx-0"
                  parentStyle="mt-2"
                  labelFor="logo"
                />
              </div> */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  Store Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="E.g;Gade’s store"
                  value={storeSettingDetails.name}
                  className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={handleChangeStoreInfo}
                />
              </div>
              <div>
                <label
                  htmlFor="country"
                  className="text-[16px] font-bold text-[#333333] flex items-center"
                >
                  Country
                </label>

                <input
                  type="text"
                  id="country"
                  name="country"
                  value={storeSettingDetails.country}
                  placeholder="Enter it here"
                  className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={handleChangeStoreInfo}
                />
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="text-[16px] font-bold text-[#333333] flex items-center"
                >
                  State
                </label>

                <input
                  type="text"
                  id="state"
                  name="state"
                  value={storeSettingDetails.state}
                  placeholder="Enter it here"
                  className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={handleChangeStoreInfo}
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  City
                </label>

                <input
                  type="text"
                  id="city"
                  name="city"
                  value={storeSettingDetails.city}
                  placeholder="Enter it here"
                  className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={handleChangeStoreInfo}
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
                  value={storeSettingDetails.facebook}
                  placeholder="https//:wwww.facebook.com/Mynile.store"
                  className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={handleChangeStoreInfo}
                />
              </div>
              <div>
                <label
                  htmlFor="instagram"
                  className="text-[16px] font-bold text-[#333333]"
                >
                  Instagram Link
                </label>
                <input
                  type="text"
                  id="instagram"
                  name="instagram"
                  value={storeSettingDetails.instagram}
                  placeholder="https//:wwww.instagram.com/Mynile.store"
                  className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={handleChangeStoreInfo}
                />
              </div>
              <div>
                <label
                  htmlFor="twitter"
                  className="text-[16px] font-bold text-[#333333] flex items-center"
                >
                  Twitter Link
                </label>
                <input
                  type="text"
                  id="twitter"
                  name="twitter"
                  value={storeSettingDetails.twitter}
                  placeholder="https//:wwww.x.com/Mynile.store"
                  className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={handleChangeStoreInfo}
                />
              </div>
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  LinkedIn Link
                </label>

                <input
                  type="text"
                  id="linkedin"
                  name="linkedin"
                  value={storeSettingDetails.linkedin}
                  placeholder="https//:wwww.linkedin.com/Mynile.store"
                  className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={handleChangeStoreInfo}
                />
              </div>
              <div className="text-[#333] font-semibold mt-4">
                Store Currency
                <div className="border-2 border-[#8ED06C] rounded-md flex justify-between p-2">
                  <label htmlFor="currency">USD</label>
                  <input
                    type="radio"
                    name="currency"
                    value={storeSettingDetails.currency}
                    id="naira-currency"
                    onChange={handleChangeStoreInfo}
                  />
                </div>
                <div className="border-2 border-[#8ED06C] mt-2 rounded-md flex justify-between p-2">
                  <label htmlFor="currency">NAIRA</label>
                  <input
                    type="radio"
                    name="currency"
                    id="currency"
                    onChange={handleChangeStoreInfo}
                  />
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
          <SaveChanges
            isEditingStore={isEditingStore}
            handleSubmitStoreInfo={handleSubmitStoreInfo}
            showPopup={showPopup}
          />
        </div>
      </div>
    </>
  );
};

export default StoreSetting;
