import EditStaff from "../PopupModals/EditStaff";
const StaffTable = ({ isCollapsed, setShowStaffPopUp }) => {
  return (
    <section>
       
      <div
        className={`mt-28 ${
          isCollapsed ? "max-w-[1000px]" : "max-w-[900px]"
        } mx-auto`}
      >
        <button className="bg-green text-white font-bold p-inherit flex items-center w-[160px] rounded-md p-2 mb-4" onClick={()=>setShowStaffPopUp(true)}>
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
        Add New Staff
      </button>
        <table className="w-full border-separate border-spacing-y-5">
          <thead>
            <tr className="text-left bg-[#EAF4E2]">
              <th className=" p-2 shadow-lg">Staff Name</th>
              <th className=" p-2 shadow-lg">Staff Role</th>
              <th className=" p-2 shadow-lg">Date Added</th>
              <th className=" p-2 shadow-lg">Last Login</th>
              <th className=" p-2 shadow-lg">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* {currentItems?.map((category, i) => { */}
            {/* return ( */}
            <tr className="mt-4 bg-white shadow-md">
              <td className="bg-[#EAF4E2] p-2 text-[#6e6e6e] capitalize">
                {"xxxxx"}
              </td>
              <td className="bg-white p-2 text-[#6e6e6e]  capitalize">
                {"Admin"}
              </td>
              <td className="bg-white p-2 text-[#6e6e6e]  ">{"Date xxx"}</td>

              <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                10:17pm
              </td>
              <td className="bg-white p-2 text-[#6e6e6e] font-semibold capitalize">
                <EditStaff/>
              </td>
            </tr>
            {/* ); */}
            {/* })} */}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default StaffTable;
