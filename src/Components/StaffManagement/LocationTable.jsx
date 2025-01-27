import usePagination from "../Pagination/PaginationHook";
import AddLocation from "../PopupModals/AddLocation";
import EditLocation from "../PopupModals/EditLocation";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchLocations } from "@/datahooks/location/useLocationhook";
import Skeleton from "react-loading-skeleton";
const LocationTable = ({ isCollapsed }) => {
  const [locationOpen, setLocationOpen] = useState(false);
  const { locations, isError, isFetchingLocation } = useFetchLocations();
  return (
    <section>
      <div
        className={`mt-28 ${
          isCollapsed ? "lg:max-w-[1000px]" : "lg:max-w-[820px]"
        } mx-auto  `}
      >
        <button
          className="bg-green text-white font-bold p-inherit flex items-center w-[185px] rounded-md p-2 mb-4"
          onClick={() => setLocationOpen(true)}
        >
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 8V16M16.5 12H8.5"
              stroke="currentcolor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 12C3 7.52166 3 5.28249 4.39124 3.89124C5.78249 2.5 8.02166 2.5 12.5 2.5C16.9783 2.5 19.2175 2.5 20.6088 3.89124C22 5.28249 22 7.52166 22 12C22 16.4783 22 18.7175 20.6088 20.1088C19.2175 21.5 16.9783 21.5 12.5 21.5C8.02166 21.5 5.78249 21.5 4.39124 20.1088C3 18.7175 3 16.4783 3 12Z"
              stroke="currentcolor"
              strokeWidth="1.5"
            />
          </svg>
          Add New Location
        </button>
        {isFetchingLocation ? (
          <div className="w-full mt-5">
            <Skeleton className=" h-[40px] w-full block" />
            <Skeleton className=" h-[40px] w-full block" />
            <Skeleton className=" h-[40px] w-full block" />
          </div>
        ):isError?<div className="flex justify-center align-center font-bold"><p>Error fetching location</p> </div> : (
          <table className="w-full border-separate border-spacing-y-5">
            <thead>
              <tr className="text-left bg-[#EAF4E2]">
                <th className=" p-2 shadow-lg">Location Name</th>
                <th className=" p-2 shadow-lg">Country</th>
                <th className=" p-2 shadow-lg">State</th>
                <th className=" p-2 shadow-lg">City</th>
                <th className=" p-2 shadow-lg">Action</th>
                <th className=" p-2 shadow-lg">Action</th>
              </tr>
            </thead>
            <tbody>
                {locations?.map((location, i) => {
                return (
                  <tr className="mt-4 bg-white shadow-md" key={location?.id}>
                    <td className="bg-[#EAF4E2] p-2 text-[#6e6e6e] capitalize">
                      {location.locationName || "xxxxx"}
                    </td>
                    <td className="bg-white p-2 text-[#6e6e6e]  capitalize">
                      {location.country || "country"}
                    </td>
                    <td className="bg-white p-2 text-[#6e6e6e]  ">
                      {location.state || "state"}
                    </td>

                    <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                      {location.city || "city"}
                    </td>
                    <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                      <Link to={`/branch/${location.id}`}>
                        <button
                          type="button"
                          className="text-lightGreen font-bold transitions hover:underline  "
                        >
                          {" "}
                          View
                        </button>
                      </Link>
                    </td>
                    <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                      <EditLocation location={location}/>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {locationOpen && (
        <AddLocation
          locationOpen={locationOpen}
          setLocationOpen={setLocationOpen}
        />
      )}
    </section>
  );
};

export default LocationTable;
