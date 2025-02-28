import { useForm, Controller } from "react-hook-form";
import SaveChanges from "../PopupModals/SaveChanges";
import {
  useEditStoreSettings,
  useFetchStoreSettings,
} from "@/datahooks/users/storeSettings";
import { useState, useEffect } from "react";
import { useFetchCountries } from "../GetCountries/GetCountries";
import DashboardIntro from "../Dashboard/DashboardIntro";
import EnableEdit from "./EnableEdit";
import { useEnableEdit } from "@/ZustandStores/enableEdit";
const StoreSetting = () => {
  const { data } = useFetchStoreSettings();
  const [showPopup, setShowPopup] = useState(false);
  const { isEditingStore, addStoreSettingsToBackend } = useEditStoreSettings(
    () => {
      setShowPopup(false);
      disableEditMode("store");
    }
  );
  const { data: countries, isLoading, isError } = useFetchCountries();
  const { buttonStates, disableEditMode } = useEnableEdit();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: data?.name,
      currency: data?.currency,
      country: data?.country,
      address: data?.address,
      state: data?.state,
      logo: data?.logo,
      facebook: data?.facebook,
      instagram: data?.instagram,
      linkedin: data?.linkedin,
      twitter: data?.twitter,
    },
  });
  const socialMediaRegex =
    /^https?:\/\/(www\.)?(facebook|x|linkedin|instagram)\.com\/[a-zA-Z0-9_]+\/?$/i;

  const currentValues = getValues();
  useEffect(() => {
    if (data) {
      // Set values only if new data exists; preserve old data for unchanged fields
      setValue("name", data.name || currentValues.name || "");
      setValue("city", data.city || currentValues.address || "");
      setValue("country", data.country || currentValues.country || "");
      setValue("logo", data.logo || currentValues.logo || "");
      setValue("state", data.state || currentValues.state || "");
      setValue("facebook", data.facebook || currentValues.facebook || "");
      setValue("instagram", data.instagram || currentValues.instagram || "");
      setValue("linkedin", data.linkedin || currentValues.linkedin || "");
      setValue("twitter", data.twitter || currentValues.twitter || "");
      setValue("currency", data.currency || currentValues.currency || "");
    }
  }, [data, currentValues, setValue]);
  const onSubmit = (formData) => {
    const newData = {
      name: formData.name,
      currency: formData.currency,
      country: formData.country,
      address: formData.address,
      state: formData.state,
      logo: formData.logo,
      facebook: formData.facebook,
      instagram: formData.instagram,
      linkedin: formData.linkedin,
      twitter: formData.twitter,
    };
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
  };

  return (
    <div className="">
      <div className="lg:max-w-[800px] mx-auto mt-[73px] ">
        <article className="flex flex-col gap-4 lg:flex-row lg:gap-0 md:justify-between lg:items-center  ">
          <DashboardIntro
            introText={
              buttonStates.store.editMode ? "Edit Mode" : "Store Information"
            }
          />
       {  !buttonStates.store.editMode&& <EnableEdit text="Store Information" buttonKey="store" />}
        </article>
        <form className="mt-8">
          {/* First Section */}
          <div className="space-y-4 w-full p-4 shadow-lg border rounded-md">
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
                {...register("name", { required: "Store Name is required" })}
                placeholder="E.g; Gade’s store"
                className={`mt-1 w-full p-3 rounded-md border-[#6e6e6e] border bg-white text-sm text-gray-700 ${
                  buttonStates.store.editMode ? "" : "cursor-not-allowed"
                }`}
                readOnly={!buttonStates.store.editMode}
              />
              {errors.name && (
                <p className="text-sm text-red-700 my-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-[16px] font-bold text-lightBlack"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                {...register("address", { required: "address is required" })}
                placeholder="Enter it here"
                className={`mt-1 w-full p-3 rounded-md border-[#6e6e6e] border bg-white text-sm text-gray-700 ${
                  buttonStates.store.editMode ? "" : "cursor-not-allowed"
                }`}
              />
            </div>
            <article className="grid-container grid md:grid-cols-2 lg:gap-4 lg:items-center">
              <div>
                <label
                  htmlFor="country"
                  className="text-[16px] font-bold text-[#333333] flex items-center"
                >
                  Country
                </label>
                <select
                  {...register("country", {
                    required: "Country is required",
                    validate: (value) =>
                      value !== "" || "Please select a country",
                  })}
                  className={`border border-[#6e6e6e] rounded-md p-3 block w-full ${
                    buttonStates.store.editMode ? "" : "cursor-not-allowed"
                  }`}
                  disabled={isLoading || isError}
                  readOnly={!buttonStates.store.editMode}
                >
                  <option value="">Select a country</option>
                  {countries?.map((country) => (
                    <option
                      key={country.name.common}
                      value={country.name.common}
                    >
                      {country.name.common}
                    </option>
                  ))}
                </select>

                {isLoading && (
                  <p className="text-sm text-gray-500">Loading countries...</p>
                )}
                {isError && (
                  <p className="text-sm text-red-500">
                    Error loading countries
                  </p>
                )}
                {errors.country && (
                  <p className="text-red-500">{errors.country.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="text-[16px] font-bold text-[#333333]"
                >
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  {...register("state", { required: "State is required" })}
                  placeholder="Enter it here"
                  className={`mt-1 w-full p-3 rounded-md border-[#6e6e6e] border bg-white text-sm text-gray-700 ${
                    buttonStates.store.editMode ? "" : "cursor-not-allowed"
                  }`}
                  readOnly={!buttonStates.store.editMode}
                />
              </div>
            </article>

            {/* Second Section social links */}
            <div className="w-full">
              <div className="mt-4">
                <label
                  htmlFor="facebook"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  Facebook Link
                </label>
                <input
                  type="text"
                  id="facebook"
                  {...register(
                    "facebook",
                    {
                      pattern: {
                        value: socialMediaRegex,
                        message: "Invalid Facebook URL format",
                      },
                    },
                    { required: "facebook link is required" }
                  )}
                  placeholder="https://www.facebook.com/Mynile"
                  className={`mt-1 w-full p-3 rounded-md border-[#6e6e6e] border bg-white text-sm text-gray-700 ${
                    buttonStates.store.editMode ? "" : "cursor-not-allowed"
                  }`}
                  readOnly={!buttonStates.store.editMode}
                />
                {errors.facebook && (
                  <p className="text-sm text-red-700 my-1">
                    {errors.facebook.message}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="twitter"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  Twitter Link
                </label>
                <input
                  type="text"
                  id="twitter"
                  {...register(
                    "twitter",
                    {
                      pattern: {
                        value: socialMediaRegex,
                        message: "Invalid twitter URL format",
                      },
                    },
                    { required: "twitter link is required" }
                  )}
                  placeholder="https://www.x.com/Mynile"
                  className={`mt-1 w-full p-3 rounded-md border-[#6e6e6e] border bg-white text-sm text-gray-700 ${
                    buttonStates.store.editMode ? "" : "cursor-not-allowed"
                  }`}
                  readOnly={!buttonStates.store.editMode}
                />
                {errors.twitter && (
                  <p className="text-sm text-red-700 my-1">
                    {errors.twitter.message}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="instagram"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  Instagram Link
                </label>
                <input
                  type="text"
                  id="instagram"
                  {...register(
                    "instagram",
                    {
                      pattern: {
                        value: socialMediaRegex,
                        message: "Invalid instagram URL format",
                      },
                    },
                    { required: "instagram link is required" }
                  )}
                  placeholder="https://www.instagram.com/Mynile"
                  className={`mt-1 w-full p-3 rounded-md border-[#6e6e6e] border bg-white text-sm text-gray-700 ${
                    buttonStates.store.editMode ? "" : "cursor-not-allowed"
                  }`}
                  readOnly={!buttonStates.store.editMode}
                />
                {errors.instagram && (
                  <p className="text-sm text-red-700 my-1">
                    {errors.instagram.message}
                  </p>
                )}
              </div>
              <div className="mt-4">
                <label
                  htmlFor="linkedin"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  Linkedin Link
                </label>
                <input
                  type="text"
                  id="linkedin"
                  {...register(
                    "linkedin",
                    {
                      pattern: {
                        value: socialMediaRegex,
                        message: "Invalid linkedin URL format",
                      },
                    },
                    { required: "linkedin link is required" }
                  )}
                  placeholder="https://www.linkedin.com/Mynile"
                  className={`mt-1 w-full p-3 rounded-md border-[#6e6e6e] border bg-white text-sm text-gray-700 ${
                    buttonStates.store.editMode ? "" : "cursor-not-allowed"
                  }`}
                  readOnly={!buttonStates.store.editMode}
                />
                {errors.linkedin && (
                  <p className="text-sm text-red-700 my-1">
                    {errors.linkedin.message}
                  </p>
                )}
              </div>
              {/* radio buttons */}
              <div className="text-[#333] font-semibold mt-4">
                Store Currency
                <div className="border border-[#6e6e6e] rounded-md flex justify-between p-2">
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
                <div className="border border-[#6e6e6e] mt-2 rounded-md flex justify-between p-2">
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
           {buttonStates.store.editMode&&<button
              type="button"
              className="bg-green text-white font-semibold ml-auto block p-2 w-[128px] rounded-md my-12"
              onClick={handleSubmit(onSubmit)}
            >
              {isEditingStore?'Saving..':'  Save Changes'}
             
            </button>}
          </div>
        </form>
      </div>

      {/* Save Changes Button */}
      <div className="mt-10">
        <SaveChanges isEditingStore={isEditingStore} showPopup={showPopup} setShowPopup={ setShowPopup} />
      </div>
    </div>
  );
};

export default StoreSetting;
