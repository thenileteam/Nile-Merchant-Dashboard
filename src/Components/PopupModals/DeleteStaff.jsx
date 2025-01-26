import { useStaffStore } from "../../ZustandStores/staffStore";
import { useDeleteStaff } from "../../datahooks/staffs/usestaffhook";
const DeleteStaff = ({ staff , setEditStaff}) => {
  const { deleteStaff, isDeletingStaff } = useDeleteStaff();
  const {openDelStaff, delStaff,closeDelStaff} = useStaffStore();
  const handleDeleteStaff = () => {
    try {
      //delete staff chosen
      deleteStaff(staff);
      closeDelStaff()
    } catch (error) {
      console.error(`error.. ${error}`);
    }
    setEditStaff(false)
  };
  return (
    <>
        <button
          type="button"
          className="border border-lightGreen text-lightGreen w-[150px] p-2 rounded-md"
          onClick={openDelStaff}
        >
          Delete Admin
        </button>
      {delStaff&&<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full relative max-w-[250px]">
          <button
            className="text-md text-lightGreen border rounded-sm absolute top-2 right-3"
            onClick={closeDelStaff}
          >
            x
          </button>
          <h3 className="my-2">Are you sure you want to delete this Admin?</h3>
          <div className="font-medium flex justify-center gap-4 align-center">
            <button
              className="border border-lightGreen p-1 text-lightGreen rounded-sm w-[70px]"
              onClick={handleDeleteStaff}
            >
              {isDeletingStaff ? "Del.." : "Yes"}
            </button>
            <button
              className="text-white bg-green rounded-sm w-[70px] hover:bg-transparent hover:text-lightGreen hover:border border-lightGreen transitions"
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
