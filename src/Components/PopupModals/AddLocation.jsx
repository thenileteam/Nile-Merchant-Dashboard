import { useForm } from "react-hook-form";
import { useCreateLocation } from "../../datahooks/location/useLocationhook";
 import {useStore} from '../../ZustandStores/generalStore'
const AddLocation = ({setLocationOpen }) => {
  const {store} = useStore()
  const storeId = store?.id
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addLocationToBackend, locationPending } = useCreateLocation();
  const submitLocation = (data) => {
    const locationData = {
      storeId,
      locationName: data.locationName,
      address: `${data.city}, ${data.state}, ${data.country}`,
      state: data.state,
      city: data.city,
      country: data.country,
    };
    console.log(locationData);
    addLocationToBackend(locationData)
  };
  return (
    <div>
      <div className="bg-[rgba(0,0,0,0.6)] fixed inset-0 z-50">
        <div className="max-w-[450px] mx-auto relative">
          <button
            className="absolute top-4 right-4 text-lightGreen border border-lightGreen rounded-lg"
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
            className="bg-white p-8 mt-[100px]  "
          >
            <div className="grid grid-cols-2 gap-5">
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
                    required: "Location name is required",
                  })}
                  placeholder="Enter Location Name "
                  className="border border-lightGreen rounded-md p-2 block w-full"
                />
                {errors.locationName && (
                  <p className="text-red-500">{errors.locationName.message}</p>
                )}
              </div>
              <div className="">
                <label
                  htmlFor="country"
                  className="mb-2 text-lightBlack font-bold"
                >
                  Country
                </label>
                <input
                  type="text"
                  {...register("country", { required: "Country is required" })}
                  placeholder="Enter country"
                  className="border border-lightGreen rounded-md p-2 block w-full"
                />
                {errors.country && (
                  <p className="text-red-500">{errors.country.message}</p>
                )}
              </div>
              <div className="">
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
                  className="border border-lightGreen rounded-md p-2 block w-full"
                />
                {errors.state && (
                  <p className="text-red-500">{errors.state.message}</p>
                )}
              </div>
              <div className="">
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
                  className="border border-lightGreen rounded-md p-2 block w-full"
                />
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
              </div>
            </div>
            {/* Buttons */}
            <button
              type="button"
              className="bg-green text-white w-[150px] p-2 rounded-md block mx-auto mt-5"
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
