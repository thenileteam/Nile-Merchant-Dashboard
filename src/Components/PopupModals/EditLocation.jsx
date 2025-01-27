
import { useEditLocation } from "@/datahooks/location/useLocationhook";
import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
const store = JSON.parse(localStorage.getItem('store'))

const EditLocation = ({ location }) => {
  const storeId = store?.id
  const [editLocation, setEditLocation]= useState(false)
  const { handleSubmit, register, reset,  formState: { errors },} = useForm({
    defaultValues: {
      locationName: location?.locationName || '',
      country:location?.country||'',
      city: location?.city || '',
      state: location?.state||''
    }
  })

  const { addEditLocationToBackend, isEditingLocation } = useEditLocation()
  const submitEditedLocation = (data) => {
    const updatedData = {
      storeId,
      locationName: data.locationName,
      country:location?.country,
      city: location?.city ,
      state: location?.state
    }
    addEditLocationToBackend({ data: updatedData, location })
  }
  return (
    <div>
      <button className="hover:scale-110 duration-300 hover:border-[#8ED06C] border-[#ffffff] border-b-[2px] transition underline-offset-2 decoration-[2px] inline-block hover:-translate-x-1" onClick={() => {
        setEditLocation(true)
        reset()
      }}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG Content */}
          <path
            d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591"
            stroke="#8ED06C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3"
            stroke="#8ED06C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* form content */}
      {editLocation && (
        <div className="bg-[rgba(0,0,0,0.4)] fixed inset-0 z-50">
          <div className="max-w-[450px] mx-auto relative">
            <button
              className="absolute top-4 right-4 text-lightGreen border border-lightGreen rounded-lg"
              onClick={() => setEditLocation(false)}
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
          {/* form */}
          <form
            className="bg-white p-8 mt-[100px]">
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
              disabled={isEditingLocation}
              onClick={handleSubmit(submitEditedLocation)}
            >
              {isEditingLocation ? "Saving..." : "Save changes"}
            </button>
          </form>
          </div>
          </div>
      )}
    </div>
  );
};
export default EditLocation;
