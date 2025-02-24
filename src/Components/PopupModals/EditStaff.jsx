import { useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import * as Switch from "@radix-ui/react-switch";
import { FiHome, FiPackage, FiShoppingCart, FiUser,FiBarChart2 } from "react-icons/fi";
import {
  useEditStaff,
  useFetchRoles,
} from "../../datahooks/staffs/usestaffhook";
const EditStaff = ({ staff }) => {
  const [editStaff, setEditStaff] = useState(false);
  const { roles } = useFetchRoles();
  // Populate editStaff form with the existing values
  const { addStaffToBackend, isEditingStaff } = useEditStaff(() => setEditStaff(false));
  
//initialize the form with existing values
  const { handleSubmit, reset, register, control } = useForm({
    defaultValues: {
      adminName: staff?.name || "",
      roles: roles?.reduce((acc, role) => {
        acc[role.id] = staff?.roles?.some((item) => item.id === role.id) || false;
        return acc;
      }, {}),
    },
  });

  const onSubmit = (data) => {
    const updatedStaff = {
      id: staff?.id,
      name: data.adminName,
      roles: roles
        .filter((role) => data.roles[role.id])
        .map((role) => ({ id: role.id, name: role.name })),
    };

    addStaffToBackend(updatedStaff);
  };

  const handleEditClick = () => {
    setEditStaff(true);
    reset(); // Reset the form with current staff data
  };

  return (
    <div>
      <button
        className="hover:scale-110 duration-300 hover:border-lightBlack border-[#ffffff] border-b-[2px] transition underline-offset-2 decoration-[2px] inline-block hover:-translate-x-1"
        onClick={handleEditClick}>
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
            stroke="#6e6e6e"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3"
            stroke="#6e6e6e"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {/* {editStaff && ( */}
        <div className={`bg-[rgba(0,0,0,0.3)] fixed inset-0 z-50 backdrop-blur-sm ${editStaff?'visible':'invisible'}`}>
          <div className={`fixed w-[90%] lg:w-[35%] rounded-tl-xl shadow-lg top-0 bottom-0 right-0 bg-white  ${editStaff? "translate-x-0":"translate-x-full"} transition-all duration-200 ease-in overflow-y-auto custom-scrollbar`}>
            <button
              className="absolute top-4 left-4 text-green  rounded-lg"
              onClick={() => setEditStaff(false)}
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
              onSubmit={handleSubmit(onSubmit)}
              className="p-8"
            >
              <h2 className='text-[32px] font-bold border-b border-lightBlack my-6'>Edit Staff</h2>
              {/* Admin Name */}
              <div className="mt-4">
                <label
                  htmlFor="adminName"
                  className="mb-2 text-lightBlack font-bold"
                >
                  Admin Name
                </label>
                <input
                  type="text"
                  {...register("adminName")}
                  placeholder="Enter Admin Name e.g Farouk Kola"
                  className="border border-[#6e6e6e] rounded-md p-2 block w-full"
                  required
                />
              </div>

              {/* Permissions */}
              <h4 className="text-green font-bold mt-2">
                Last Login:{" "}
                <span className="text-lightBlack">{staff?.updatedAt.split('T')[0]||'00:00pm'}</span>
              </h4>
              <h4 className="text-green font-bold mt-2">
                Assigned Location:{" "}
                <span className="text-lightBlack">{staff?.location.locationName}</span>
              </h4>
              <div>
                <h3 className="text-green font-bold mt-2">Permissions</h3>
                <p className="mb-2 text-[#6e6e6e] text-[12px]">
                  Choose What The Admin Should Be Able To Access:
                </p>
                {roles?.
                  map((role, index) => {
                    return (
                      <div
                        key={index}
                        className="border bg-[#EAF4E2] rounded-md flex mt-2 justify-between items-center p-3"
                      >
                        <div className="flex items-center gap-1">
                        {index===0?<FiPackage className="text-lightGreen"/>:index===1?<FiBarChart2 className="text-lightGreen"/>: index===2?<FiShoppingCart className="text-lightGreen"/>:< FiUser className="text-lightGreen"/>} 
                          <h3 className="text-gray-800 font-normal text-sm">
                            {role.name}
                          </h3>
                        </div>
                        <Controller
                          name={`roles.${role.id}`}
                          control={control}
                          defaultValue={
                            staff?.roles?.some(
                              (assignedRole) => assignedRole.id === role.id
                            ) || false
                          }
                          render={({ field }) => (
                            <Switch.Root
                            className="w-10 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-lightGreen"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          >
                            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform transform data-[state=checked]:translate-x-[18px]" />
                          </Switch.Root>
                          )}
                        />
                      </div>
                    );
                  })}
              </div>

              {/*edit Button*/}
                <button
                  type="submit"
                  className="bg-green text-white w-full block p-2 rounded-md mt-5"
                  disabled={isEditingStaff}
                >
                  {isEditingStaff ? "Saving..." : "Save Changes"}
                </button>
            </form>
          </div>
        </div>
      {/* )} */}
    </div>
  );
};

export default EditStaff;
