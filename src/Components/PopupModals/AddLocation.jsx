import { useForm } from "react-hook-form";
import {useCreateLocation }from '../../datahooks/location/useLocationhook'
const AddLocation = ({locationOpen, setLocationOpen}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { addLocationToBackend, locationPending } = useCreateLocation()
  const submitLocation = (data) => {
    console.log(data)
    try {
      
      addLocationToBackend(data)
    } catch (error) {
      console.error('error :', error)
    }
  }
  return (
     <div>
        <div className="bg-[rgba(0,0,0,0.6)] fixed inset-0">
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
              onSubmit={handleSubmit(submitLocation)}
              className="bg-white p-8 mt-[100px]  "
          > 
            <div className="grid grid-cols-2 gap-5">
              {/* Admin Name */}
              <div className="">
                <label
                  htmlFor="adminName"
                  className="mb-2 text-lightBlack font-bold"
                >
                  Location Name
                </label>
                <input
                  type="text"
                  {...register("locationName")}
                  placeholder="Enter Location Name "
                  className="border border-lightGreen rounded-md p-2 block w-full"
                  required
                />
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
                  {...register("country")}
                  placeholder="Enter country"
                  className="border border-lightGreen rounded-md p-2 block w-full"
                  required
                />
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
                  {...register("state")}
                  placeholder="Enter Admin State"
                  className="border border-lightGreen rounded-md p-2 block w-full"
                  required
                />
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
                  {...register("city")}
                  placeholder="Enter City"
                  className="border border-lightGreen rounded-md p-2 block w-full"
                  required
                />
              </div>
            </div>
              {/* Buttons */}
                <button
              type="submit"
              className="bg-green text-white w-[150px] p-2 rounded-md block mx-auto mt-5"
              disabled={locationPending}
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
