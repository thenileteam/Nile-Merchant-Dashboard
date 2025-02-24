import { useStaffStore } from "../../ZustandStores/staffStore";
import { useDeleteStaff } from "../../datahooks/staffs/usestaffhook";
const DeleteStaff = ({ staff}) => {
  const {openDelStaff, delStaff,closeDelStaff} = useStaffStore();
  const { deleteStaff, isDeletingStaff } = useDeleteStaff(() => {
    closeDelStaff()
  });
  const handleDeleteStaff = () => {
    try {
      //delete staff chosen
      deleteStaff(staff);
      closeDelStaff()
    } catch (error) {
      console.error(`error.. ${error}`);
    }
  };
  return (
    <>
       <button
        onClick={openDelStaff}
        className="hover:scale-110 duration-300 hover:border-[#6e6e6e] border-[#ffffff] border-b-[2px] transition underline-offset-2 decoration-[2px] inline-block hover:-translate-x-1"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26 7.33398L25.1737 20.7008C24.9625 24.1159 24.8571 25.8235 24.0011 27.0512C23.5777 27.6581 23.0329 28.1704 22.4009 28.5553C21.1228 29.334 19.412 29.334 15.9903 29.334C12.5642 29.334 10.8511 29.334 9.57207 28.5539C8.93973 28.1683 8.39467 27.6551 7.97157 27.0471C7.11584 25.8175 7.0126 24.1075 6.80615 20.6876L6 7.33398"
            stroke="#6e6e6e"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 15.6465H20"
            stroke="#6e6e6e"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M14 20.873H18"
            stroke="#6e6e6e"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M4 7.33268H28M21.4073 7.33268L20.4972 5.45499C19.8925 4.2077 19.5901 3.58404 19.0687 3.1951C18.9531 3.10882 18.8305 3.03207 18.7024 2.96562C18.1249 2.66602 17.4319 2.66602 16.0457 2.66602C14.6248 2.66602 13.9144 2.66602 13.3273 2.97818C13.1972 3.04736 13.0731 3.12722 12.9561 3.21691C12.4286 3.62162 12.1339 4.26808 11.5446 5.56103L10.737 7.33268"
            stroke="#6e6e6e"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {delStaff&&<div className="fixed inset-0 bg-black/15 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full relative max-w-[250px]">
          <button
            className="text-md text-lightGreen rounded-sm absolute top-2 right-3"
            onClick={closeDelStaff}
          >
            x
          </button>
          <h3 className="my-2">Are you sure you want to delete this Admin?</h3>
          <div className="font-medium flex justify-center gap-4 align-center my-4">
            <button
              className="border border-lightGreen p-1 text-lightGreen rounded-md w-[70px]"
              onClick={handleDeleteStaff}
            >
              {isDeletingStaff ? "Del.." : "Yes"}
            </button>
            <button
              className="text-white bg-green rounded-md w-[70px] hover:bg-transparent hover:text-lightGreen hover:border border-lightGreen transitions"
              onClick={closeDelStaff}
            >
              No
            </button>
          </div>
        </div>
      </div>}
    </>
  );
};

export default DeleteStaff;
