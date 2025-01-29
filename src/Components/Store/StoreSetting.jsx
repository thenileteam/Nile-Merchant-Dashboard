import { useForm, Controller } from "react-hook-form";
import { validateForm } from "@/utils/formatdate";
import SaveChanges from "../PopupModals/SaveChanges";
import { useEditStoreSettings, useFetchStoreSettings } from "@/datahooks/users/storeSettings";
import { useState,useEffect } from "react";

const StoreSetting = () => {
  const { data } = useFetchStoreSettings();
  const { isEditingStore, addStoreSettingsToBackend } = useEditStoreSettings();
  const [showPopup, setShowPopup] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
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
    },
  });

  // Populate only the `name` field initially
  useEffect(() => {
    if (data?.name) {
      setValue("name", data.name);
    }
  }, [data, setValue]);

  const socialMediaRegex =/^https?:\/\/(www\.)?(facebook|x|linkedin|instagram)\.com\/[a-zA-Z0-9_.]+$/;

  const onSubmit = (formData) => {
    addStoreSettingsToBackend(formData, {
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
  };

  return (
    <div className="mt-20">
      <div className="lg:max-w-[1000px] mx-auto">
        <form  className="flex justify-center gap-28">
          {/* First Section */}
          <div className="space-y-5 bg-[#EAF4E2] border-[#8ED06C] border-2 max-w-[338px] p-4 rounded-lg">
            <div>
              <label htmlFor="name" className="block text-[16px] font-bold text-[#333333]">
                Store Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Store Name is required" })}
                placeholder="E.g; Gade’s store"
                className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.name && <p className="text-sm text-red-700 my-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="country" className="text-[16px] font-bold text-[#333333] flex items-center">
                Country
              </label>
              <input
                type="text"
                id="country"
                {...register("country")}
                placeholder="Enter it here"
                className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="state" className="text-[16px] font-bold text-[#333333] flex items-center">
                State
              </label>
              <input
                type="text"
                id="state"
                {...register("state", { required: "State is required" })}
                placeholder="Enter it here"
                className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-[16px] font-bold text-[#333333]">
                City
              </label>
              <input
                type="text"
                id="city"
                {...register("city", { required: "City is required" })}
                placeholder="Enter it here"
                className="mt-1 w-[296px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
          </div>

          {/* Second Section social links */}
          <div className="bg-[#EAF4E2] border-[#8ED06C] border-2 w-[360px] p-4 rounded-lg">
            
            <div>
              <label htmlFor="facebook" className="block text-[16px] font-bold text-[#333333]">
                Facebook Link
              </label>
              <input
                type="text"
                id="facebook"
                {...register("facebook", {
                  pattern: {
                    value: socialMediaRegex,
                    message: "Invalid Facebook URL format",
                  },
                }, { required: "facebook link is required" })}
                placeholder="https://www.facebook.com/Mynile.store"
                className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.facebook && <p className="text-sm text-red-700 my-1">{errors.facebook.message}</p>}
            </div>
            <div>
              <label htmlFor="twitter" className="block text-[16px] font-bold text-[#333333]">
                Twitter Link
              </label>
              <input
                type="text"
                id="twitter"
                {...register("twitter", {
                  pattern: {
                    value: socialMediaRegex,
                    message: "Invalid twitter URL format",
                  },
                }, { required: "twitter link is required" })}
                placeholder="https://www.x.com/Mynile.store"
                className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.twitter && <p className="text-sm text-red-700 my-1">{errors.twitter.message}</p>}
            </div>
            <div>
              <label htmlFor="instagram" className="block text-[16px] font-bold text-[#333333]">
                Instagram Link
              </label>
              <input
                type="text"
                id="instagram"
                {...register("instagram", {
                  pattern: {
                    value: socialMediaRegex,
                    message: "Invalid instagram URL format",
                  },
                }, { required: "instagram link is required" })}
                placeholder="https://www.instagram.com/Mynile.store"
                className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.instagram && <p className="text-sm text-red-700 my-1">{errors.instagram.message}</p>}
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-[16px] font-bold text-[#333333]">
                Linkedin Link
              </label>
              <input
                type="text"
                id="facebook"
                {...register("linkedin", {
                  pattern: {
                    value: socialMediaRegex,
                    message: "Invalid linkedin URL format",
                  },
                }, { required: "linkedin link is required" })}
                placeholder="https://www.linkedin.com/Mynile.store"
                className="mt-1 w-[316px] p-3 rounded-md border-[#8ED06C] border-2 bg-white text-sm text-gray-700 shadow-sm"
              />
              {errors.linkedin && <p className="text-sm text-red-700 my-1">{errors.linkedin.message}</p>}
            </div>
            {/* radio buttons */}
            <div className="text-[#333] font-semibold mt-4">
              Store Currency
              <div className="border-2 border-[#8ED06C] rounded-md flex justify-between p-2">
                <label htmlFor="currency-usd">USD</label>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="radio"
                      {...field}
                      value="USD"
                      id="currency-usd"
                      checked={field.value === "USD"}
                    />
                  )}
                />
              </div>
              <div className="border-2 border-[#8ED06C] mt-2 rounded-md flex justify-between p-2">
                <label htmlFor="currency-naira">NAIRA</label>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="radio"
                      {...field}
                      value="Naira"
                      id="currency-naira"
                      checked={field.value === "Naira"}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Save Changes Button */}
      <div className="flex justify-center mt-10">
        <SaveChanges
          isEditingStore={isEditingStore}
          handleSubmitStoreInfo={handleSubmit(onSubmit)}
          showPopup={showPopup}
        />
      </div>
    </div>
  );
};

export default StoreSetting;