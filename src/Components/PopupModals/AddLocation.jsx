/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { useCreateLocation } from "../../datahooks/location/useLocationhook";
import { useStore } from "../../ZustandStores/generalStore";
import { useFetchCountries } from "../GetCountries/GetCountries";

// Country fetch function
 
const AddLocation = ({locationOpen, setLocationOpen }) => {
  const {store} = useStore()
  const storeId = store?.id
  const { data: countries, isLoading, isError } = useFetchCountries();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { addLocationToBackend, locationPending } = useCreateLocation(() => {
    setLocationOpen(false);
  });
  const submitLocation = (data) => {
    const locationData = {
      storeId,
      locationName: data.locationName,
      address: `${data.city}, ${data.state}, ${data.country}`,
      state: data.state,
      city: data.city,
      country: data.country
    };
    addLocationToBackend(locationData);
  };
  return (
    <div>
      <div className={`bg-[rgba(0,0,0,0.3)] fixed inset-0 z-50 backdrop-blur-sm ${locationOpen? 'visible': 'invisible'}`}>
        <div className={`fixed top-0 right-0 bottom-0 lg:w-[35%] w-[90%] bg-white rounded-tl-xl ${locationOpen? "translate-x-0":"translate-x-full"} transition-all duration-200 ease-in`}>
          <button
            className="absolute top-4 left-4 text-green rounded-lg"
            onClick={() => setLocationOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <form
            className=" p-8"
          >
            <div className=" ">
            <h2 className="text-[32px] border-b border-lightBlack my-6">Add New Branch</h2>
              {/* location Name */}
              <div className="">
                <label
                  htmlFor="locationName"
                  className="mb-2 text-lightBlack font-bold"
                >
                  Location Name
                </label>
                <input
                  type="text"
                  {...register("locationName", {
                    required: "Location name is required"
                  })}
                  placeholder="Enter Location Name "
                  className="border border-lightBlack rounded-md p-2 block w-full"
                />
                {errors.locationName && (
                  <p className="text-red-500">{errors.locationName.message}</p>
                )}
              </div>
              <div className="mt-5">
                <label
                  htmlFor="country"
                  className="mb-2 text-lightBlack font-bold"
                >
                  Country
                </label>

                <select
                  {...register("country", {
                    required: "Country is required",
                    validate: (value) =>
                      value !== "" || "Please select a country"
                  })}
                  className="border border-lightBlack rounded-md p-2 block w-full"
                  disabled={isLoading || isError}
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
              <div className="mt-5">
                <label
                  htmlFor="state"
                  className="mb-2 text-lightBlack font-bold"
                >
                  State
                </label>
                <input
                  type="text"
                  {...register("state", { required: "State is required" })}
                  placeholder="Enter Admin State"
                  className="border border-lightBlack rounded-md p-2 block w-full"
                />
                {errors.state && (
                  <p className="text-red-500">{errors.state.message}</p>
                )}
              </div>
              <div className="mt-5">
                <label
                  htmlFor="city"
                  className="mb-2 text-lightBlack font-bold"
                >
                  City
                </label>
                <input
                  type="text"
                  {...register("city", { required: "City is required" })}
                  placeholder="Enter City"
                  className="border border-lightBlack rounded-md p-2 block w-full"
                />
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
              </div>
            </div>

            <div className=" flex justify-center mt-10 mb-[49px] text-[#6E6E6E] gap-6 items-center">
              <span className=" font-bold  text-[14px] leading-[18px] ">
                Make This Address Headquarter
              </span>{" "}
              <input type="checkbox" />
            </div>
            {/* Buttons */}
            <button
              type="button"
              className="bg-green text-white w-full p-2 rounded-md block mx-auto mt-16 hover:bg-[#004315]"
              disabled={locationPending}
              onClick={handleSubmit(submitLocation)}
            >
              {locationPending ? "Adding..." : "Add Location"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLocation;
