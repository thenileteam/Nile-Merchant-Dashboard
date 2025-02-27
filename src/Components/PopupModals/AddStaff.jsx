import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useFetchRoles,
  useCreateStaff,
} from "../../datahooks/staffs/usestaffhook";
import { toast } from "sonner";
import { FaBullseye } from "react-icons/fa6";
import AssignLocation from "../StaffManagement/AssignLocation";
import { useAssignLocationStore } from "@/ZustandStores/locationStore";
import { useStore } from "../../ZustandStores/generalStore";
import * as Switch  from "@radix-ui/react-switch";
import { FiHome, FiPackage, FiShoppingCart, FiUser,FiBarChart2 } from "react-icons/fi";
const AddStaff = ({ showStaffPopUp, setShowStaffPopUp }) => {
  const { store } = useStore();
  const storeId = store?.id;
  const { roles } = useFetchRoles();
  const { addStaffToBackend, isStaffPending } = useCreateStaff(() => {
    setShowStaffPopUp(false);
  });
  const { formStates } = useAssignLocationStore();
  const selectedLocationId = formStates["addStaff"].selectedLocation?.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // State to manage selected role IDs
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);

   
  const handleRoleToggle = (roleId, checked) => {
    setSelectedRoleIds((prev) =>
      checked ? [...prev, roleId] : prev.filter((id) => id !== roleId)
    );
  };
  
  // Submit data
  const submitData = (data) => {
    if (!roles?.length) {
      toast.error("roles data is still loading.");
      return;
    }
    if (!selectedLocationId) {
      toast.error("Please select a location.");
      return;
    }
    const staffData = {
      name: data.adminName,
      // phone: data.staffNumber,
      email: data.staffMail,
      roles: selectedRoleIds.map((roleId) => ({
        id: roleId,
        name: roles?.find((role) => role.id === roleId)?.name || "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })),
      locationId: selectedLocationId,
      storeId,
    };
    addStaffToBackend(staffData);
  };

  return (
    <div
      className={`bg-[rgba(0,0,0,0.3)] fixed inset-0 z-50 backdrop-blur-sm ${
        showStaffPopUp ? "visible" : "invisible"
      }`}
    >
      <div
        className={`w-[90%] lg:w-[35%] rounded-tl-xl shadow-lg mx-auto fixed top-0 right-0 bottom-0 bg-white h-screen overflow-y-auto custom-scrollbar ${
          showStaffPopUp ? "translate-x-0" : "translate-x-full"
        } transition-all duration-200 ease-in`}
      >
        <button
          className="absolute top-4 left-4 text-green rounded-md"
          onClick={() => setShowStaffPopUp(false)}
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
          className="bg-white p-6"
          // onSubmit={handleSubmit(submitData)}
        >
          <h2 className="my-6 font-bold border-b border-lightBlack text-[32px]">
            Add New Staff
          </h2>
          <div className="">
            <label
              htmlFor="adminName"
              className="mb-2 text-lightBlack font-bold"
            >
              Admin Name
            </label>
            <input
              {...register("adminName", { required: "Admin name is required" })}
              type="text"
              name="adminName"
              placeholder="Enter Admin Name e.g Farouk Kola"
              className="border border-lightBlack rounded-md p-2 block w-full"
            />
            {errors.adminName && (
              <p className="text-red-500 text-xs">{errors.adminName.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label
              htmlFor="staffMail"
              className="mb-2 text-lightBlack font-bold"
            >
              Email
            </label>
            <input
              {...register("staffMail", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              name="staffMail"
              placeholder="e.g farouk@gmail.com"
              className="border border-lightBlack rounded-md p-2 block w-full"
            />
            {errors.staffMail && (
              <p className="text-red-500 text-xs">{errors.staffMail.message}</p>
            )}
          </div>
          {/* assigned location */}
          <AssignLocation title="Staff" formType="addStaff" />
          {/* Permission checkboxes */}
          <div>
            <h3 className="text-lightBlack font-bold mt-2">Permissions</h3>
            <p className="mb-2 text-[#6e6e6e] text-[12px]">
              Choose what the Admin should be able to access:
            </p>
            {roles?.map((role, index) => (
              <div
                className="border bg-[#EAF4E2] rounded-md flex mt-2 justify-between items-center p-3"
                key={role.id}
              >
                <div className="flex items-center gap-1">
                     {index===0?<FiPackage className="text-lightGreen"/>:index===1?<FiBarChart2 className="text-lightGreen"/>: index===2?<FiShoppingCart className="text-lightGreen"/>:< FiUser className="text-lightGreen"/>}  
                  <h3 className="text-gray-800 font-normal text-sm">
                    {role.name.split(' ')[0]}
                  </h3>
                </div>
                <Switch.Root
                  className="w-10 h-5 bg-gray-300 rounded-full relative transition data-[state=checked]:bg-lightGreen"
                  id={role.id}
                  checked={selectedRoleIds.includes(role.id)}
                  onCheckedChange={(checked) => handleRoleToggle(role.id, checked)}
                >
                  <Switch.Thumb className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 transition-transform  duration-300 ease-in-out data-[state=checked]:translate-x-4" />
                </Switch.Root>
                {/* <label htmlFor={role.name}>
                  <input
                    type="checkbox"
                    id={role.id}
                    name={role.name}
                    checked={selectedRoleIds.includes(role.id)}
                    // className="sr-only peer"
                    onChange={handleCheckboxChange}
                  />
                  
                </label> */}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="bg-green w-full text-white mt-4 font-semibold block mx-auto p-2 rounded-2xl hover:bg-opacity-95 transitions"
            disabled={isStaffPending}
            onClick={handleSubmit(submitData)}
          >
            {isStaffPending ? "Sending..." : "Send An Invite"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
