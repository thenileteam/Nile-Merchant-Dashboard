import AddStaff from "../PopupModals/AddStaff";
const EmptyStaffState = ({showStaffPopUp, setShowStaffPopUp}) => {
  return (
    <div className="flex justify-center items-center max-w-[400px] mx-auto h-screen">
      <div className="text-center">
        <svg
          width="133"
          height="132"
          viewBox="0 0 133 132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto block"
        >
          <path
            d="M72 121H36.7498C28.2502 121 21.4897 116.864 15.4196 111.081C2.99351 99.2425 23.3954 89.782 31.1766 85.1488C44.3723 77.2915 60.1338 75.1162 74.75 78.6236"
            stroke="#004324"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M91.25 35.75C91.25 49.419 80.1692 60.5 66.5 60.5C52.831 60.5 41.75 49.419 41.75 35.75C41.75 22.081 52.831 11 66.5 11C80.1692 11 91.25 22.081 91.25 35.75Z"
            stroke="#004324"
            strokeWidth="1.5"
          />
          <path
            d="M88.775 88.275L115.725 115.225M121.5 101.75C121.5 91.1185 112.881 82.5 102.25 82.5C91.6185 82.5 83 91.1185 83 101.75C83 112.381 91.6185 121 102.25 121C112.881 121 121.5 112.381 121.5 101.75Z"
            stroke="#004324"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <h3 className="capitalize text-lightBlack font-semibold">You have no staffs yet!</h3>
        <strong className="text-lightBlack">
          Once you add a new staff, It will appear here.
        </strong>
        <button className="bg-green text-white py-1 px-2 rounded-md" onClick={()=>setShowStaffPopUp(true)}>Add New Staff</button>
        {showStaffPopUp && <AddStaff setShowStaffPopUp={setShowStaffPopUp} />}

      </div>
    </div>
  );
};

export default EmptyStaffState;
