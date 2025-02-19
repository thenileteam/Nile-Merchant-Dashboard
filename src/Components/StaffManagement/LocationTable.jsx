import usePagination from "../Pagination/PaginationHook";
import AddLocation from "../PopupModals/AddLocation";
import EditLocation from "../PopupModals/EditLocation";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFetchLocations } from "@/datahooks/location/useLocationhook";
import Skeleton from "react-loading-skeleton";
import EmptyState from "./EmptyState";
import DashboardIntro from '../Dashboard/DashboardIntro'
import { EmptyStateIcon } from '../Store/AllStoreComp/StoreSettingIcons'
import {FiPlus} from 'react-icons/fi'
const LocationTable = ({ isCollapsed }) => {
  const [locationOpen, setLocationOpen] = useState(false);
  const { locations, isError, isFetchingLocation } = useFetchLocations();
  return (
    <section>
      <div
        className={`mt-[73px] ${
          isCollapsed ? "lg:max-w-[1100px]" : "lg:max-w-[950px]"
        } mx-auto  `}
      >
        <article className="flex justify-between items-center">
          <DashboardIntro introText='Store Branches'/>
        {/* {locations?.length === 0 && ( */}
          <button
            className="bg-green text-white font-bold p-inherit flex items-center w-[185px] rounded-md p-2 mb-4"
            onClick={() => setLocationOpen(true)}
          > <FiPlus/>
            Add New Location
          </button>
          {/* )} */}
            </article>
        {locations?.length === 0 && (
          <EmptyState
            title="You have not added a location yet"
            description="Add new location to see your locations"
            buttonText="Add Location"
            Icon={EmptyStateIcon}
            showPopUp={locationOpen}
            setShowPopUp={setLocationOpen}
            PopUpComponent={AddLocation}
          />
        )}
        {isFetchingLocation ? (
          <div className="w-full border mt-8">
            <Skeleton className=" h-[40px] w-full block" />
            <Skeleton className=" h-[40px] w-full block" />
            <Skeleton className=" h-[40px] w-full block" />
          </div>
        ) : isError ? (
          <div className="flex justify-center align-center font-bold">
            <p>Error fetching location</p>{" "}
          </div>
        ) : (
          <div className="overflow-x-scroll lg:overflow-x-auto border-[0.5px] shadow-md rounded-md bg-white p-4 text-lightBlack mt-8">
            <table className="w-full border-separate border-spacing-y-5">
              <thead>
                <tr className="text-left bg-[#EAF4E2]">
                  <th className=" p-2 shadow-lg">Location Name</th>
                  <th className=" p-2 shadow-lg">Country</th>
                  <th className=" p-2 shadow-lg">State</th>
                  <th className=" p-2 shadow-lg">City</th>
                  <th className=" p-2 shadow-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {locations?.map((location, i) => {
                  return (
                    <tr className="mt-4 bg-white shadow-md" key={location?.id}>
                      <td className="bg-[#EAF4E2] p-2 capitalize font-bold">
                        {location.locationName || "xxxxx"}
                      </td>
                      <td className="bg-white p-2 text-[#6e6e6e] capitalize">
                        {location.country || "country"}
                      </td>
                      <td className="bg-white p-2 text-[#6e6e6e]">
                        {location.state || "state"}
                      </td>

                      <td className="bg-white p-2 capitalize text-[#6e6e6e]">
                        {location.city || "city"}
                      </td>
                      <td className="bg-white p-2  capitalize flex item-center">
                      <EditLocation location={location} />
                        <Link to={`/branch/${location.id}`}>
                          <button
                            type="button"
                            className="text-lightGreen font-bold transitions hover:underline  "
                          >
                            {" "}
                            <svg
                              width="18"
                              height="12"
                              viewBox="0 0 18 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.2247 5.58526C16.6914 4.66026 13.7581 0.0185941 8.77473 0.168594C4.1664 0.285261 1.49973 4.33526 0.774732 5.58526C0.701591 5.71194 0.663086 5.85565 0.663086 6.00193C0.663086 6.14821 0.701591 6.29191 0.774732 6.41859C1.29973 7.32693 4.10807 11.8353 9.0164 11.8353H9.22473C13.8331 11.7186 16.5081 7.66859 17.2247 6.41859C17.2979 6.29191 17.3364 6.14821 17.3364 6.00193C17.3364 5.85565 17.2979 5.71194 17.2247 5.58526ZM9.18307 10.1686C5.5914 10.2519 3.24973 7.17693 2.5164 6.00193C3.34973 4.66026 5.52473 1.91859 8.85807 1.83526C12.4331 1.74359 14.7831 4.82693 15.5247 6.00193C14.6664 7.34359 12.5164 10.0853 9.18307 10.1686Z"
                                fill="black"
                                fill-opacity="0.5"
                              />
                              <path
                                d="M8.99968 3.08496C8.42281 3.08496 7.85891 3.25602 7.37926 3.57651C6.89962 3.897 6.52578 4.35252 6.30503 4.88547C6.08427 5.41842 6.02651 6.00486 6.13905 6.57064C6.25159 7.13642 6.52938 7.65612 6.93728 8.06402C7.34518 8.47193 7.86488 8.74971 8.43066 8.86225C8.99644 8.97479 9.58288 8.91703 10.1158 8.69628C10.6488 8.47552 11.1043 8.10168 11.4248 7.62204C11.7453 7.1424 11.9163 6.57849 11.9163 6.00163C11.9163 5.22808 11.6091 4.48621 11.0621 3.93923C10.5151 3.39225 9.77322 3.08496 8.99968 3.08496ZM8.99968 7.25163C8.75245 7.25163 8.51078 7.17832 8.30521 7.04096C8.09965 6.90361 7.93944 6.70839 7.84483 6.47998C7.75022 6.25157 7.72546 6.00024 7.77369 5.75776C7.82193 5.51529 7.94098 5.29256 8.11579 5.11774C8.29061 4.94293 8.51334 4.82388 8.75581 4.77565C8.99829 4.72741 9.24962 4.75217 9.47803 4.84678C9.70644 4.94139 9.90166 5.1016 10.039 5.30717C10.1764 5.51273 10.2497 5.7544 10.2497 6.00163C10.2497 6.33315 10.118 6.65109 9.88356 6.88551C9.64914 7.11993 9.3312 7.25163 8.99968 7.25163Z"
                                fill="black"
                                fill-opacity="0.5"
                              />
                            </svg>
                          </button>
                        </Link>
                      </td>
                      {/* <td className="bg-white p-2  font-semibold capitalize">
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/* {locationOpen && ( */}
        <AddLocation
          locationOpen={locationOpen}
          setLocationOpen={setLocationOpen}
        />
      {/* )} */}
    </section>
  );
};

export default LocationTable;
