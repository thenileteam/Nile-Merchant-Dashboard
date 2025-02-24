import { useFetchStaffs } from "@/datahooks/staffs/usestaffhook";
import EditStaff from "../PopupModals/EditStaff";
import Skeleton from "react-loading-skeleton";
import DashboardIntro from '../../Components/Dashboard/DashboardIntro'
import DeleteStaff from "../PopupModals/DeleteStaff";
import { FiPlus } from "react-icons/fi";
import usePagination from "../Pagination/PaginationHook";
const StaffTable = ({ isCollapsed, setShowStaffPopUp }) => {
  const { staffs, isLoading, isError } = useFetchStaffs();
  // const itemsPerPage = 10
  //  const {pageCount, currentItems, handlePageChange}= usePagination(staffs, itemsPerPage)
  // console.log(staffs);
  // if (isLoading) {
  //   console.log('loading data..')
  // } else if (isError) {
  //   console.log('error..')
  // }
  const sortedStaffs = staffs?.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <section>
      <div
        className={`mt-[73px] ${
          isCollapsed ? "lg:max-w-[1100px]" : "lg:max-w-[950px]"
        } mx-auto`}
      >
        {/* dashboard intro */}
        <article className='flex intems-center justify-between'>
          <DashboardIntro introText="Staff Management" />
          <button
            className="bg-green text-white font-normal p-inherit flex items-center w-[150px] rounded-md p-2 mb-4"
            onClick={() => setShowStaffPopUp(true)}
          >
            <FiPlus/>
            Add New Staff
          </button>
        </article>
        {isLoading ? (
          <div className="w-full mt-8">
            <Skeleton className=" h-[40px] w-full block" />
            <Skeleton className=" h-[40px] w-full block" />
            <Skeleton className=" h-[40px] w-full block" />
          </div>
        ) : (
          <div className="overflow-x-scroll lg:overflow-auto bg-white p-4 rounded-md shadow-md text-lightBlack mt-8 border-[0.5px]">
            <table className="w-full border-separate border-spacing-y-4 ">
              <thead>
                <tr className="text-left bg-[#EAF4E2]">
                  <th className=" p-2 shadow-lg">Staff Name</th>
                  <th className=" p-2 shadow-lg">Staff Role</th>
                  <th className=" p-2 shadow-lg">Date Added</th>
                  <th className=" p-2 shadow-lg">Assigned Location</th>
                  <th className=" p-2 shadow-lg">Last Login</th>
                  <th className=" p-2 shadow-lg">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedStaffs?.map((staff, i) => {
                  const date = new Date(staff.updatedAt);
                  const hour = date.getHours();
                  const minute = date.getMinutes();
                  const ampm = hour >= 12 ? "pm" : "am";
                  const time = `${hour}:${minute
                    .toString()
                    .padStart(2, 0)}${ampm}`;
                  return (
                    <tr className="mt-4 bg-white shadow-md">
                      <td className="bg-[#EAF4E2] p-2 capitalize font-bold">
                        {staff.name || "xxxxx"}
                      </td>
                      <td className="bg-white p-2 text-[#6e6e6e] capitalize">
                        {"Admin"}
                      </td>
                      <td className="bg-white p-2  text-[#6e6e6e] capitalize">
                        {staff.createdAt.split("T")[0] || "10:37pm"}
                      </td>
                      <td className="bg-white p-2 text-[#6e6e6e] capitalize">
                        {staff?.location.locationName || "branch 1"}
                      </td>
                      <td className="bg-white p-2 text-[#6e6e6e] capitalize">
                        {time || "10:59pm"}
                      </td>
                      <td className="bg-white p-2 capitalize flex items-center ">
                        <EditStaff staff={staff} />
                        <DeleteStaff staff={staff}/>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default StaffTable;
