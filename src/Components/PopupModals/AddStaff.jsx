import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useFetchRoles,
  useCreateStaff,
} from "../../datahooks/staffs/usestaffhook";
import { toast } from "sonner";
const store = JSON.parse(localStorage.getItem("store"));
const storeId = store?.id;

const AddStaff = ({ setShowStaffPopUp }) => {
  const { roles } = useFetchRoles();
  const { addStaffToBackend, isStaffPending } = useCreateStaff();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // State to manage selected role IDs
  const [selectedRoleIds, setSelectedRoleIds] = useState([]);

  // Handle checkbox toggle
  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedRoleIds((prev) =>
      checked ? [...prev, id] : prev.filter((roleId) => roleId !== id)
    );
  };

  // Filtered roles (for now until i have to implement specific roles )
  const filteredRoles = roles?.filter((_, i) => i !== 0 && i !== 4);

  // Submit data
  const submitData = (data) => {
    if (!roles?.length) {
      toast.error("roles data is still loading.");
      return;
    }
    const staffData = {
      storeId,
      name: data.adminName,
      phone: data.staffNumber,
      email: data.staffMail,
      roles: selectedRoleIds.map((roleId) => ({
        id: roleId,
        name: roles?.find((role) => role.id === roleId)?.name || "", // Get role name
        createdAt: new Date().toISOString(), // Add createdAt
        updatedAt: new Date().toISOString(),
      })), // Use selected role IDs directly
    };
    addStaffToBackend(staffData, {
      onSuccess: () => toast.success("Staff successfully added."),
      // onError: (error) => {
      //   toast.error(error.response?.data?.message || "An error occurred.");
      // },
    });
  };

  return (
    <div className="bg-[rgba(0,0,0,0.35)] fixed inset-0 overflow-y-scroll">
      <div className="max-w-[450px] mx-auto relative">
        <button
          className="absolute top-4 right-4 text-lightGreen border border-lightGreen rounded-md"
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
          className="bg-white p-8 mt-32"
          onSubmit={handleSubmit(submitData)}
        >
          <div className="mt-4">
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
              className="border border-lightGreen rounded-md p-2 block w-full"
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
              className="border border-lightGreen rounded-md p-2 block w-full"
            />
            {errors.staffMail && (
              <p className="text-red-500 text-xs">{errors.staffMail.message}</p>
            )}
          </div>

          <div className="mt-2">
            <label
              htmlFor="staffNumber"
              className="mb-2 text-lightBlack font-bold"
            >
              Phone Number
            </label>
            <input
              {...register("staffNumber", {
                required: "Phone number is required",
                max: {
                  value: 9999999999,
                  message: "Number cannot exceed 11 digits",
                },
              })}
              type="text"
              name="staffNumber"
              maxLength={11}
              placeholder="Input staff number"
              className="border border-lightGreen rounded-md p-2 block w-full"
            />
            {errors.staffNumber && (
              <p className="text-red-500 text-xs">
                {errors.staffNumber.message}
              </p>
            )}
          </div>

          <div className="mt-2">
            <label
              htmlFor="adminPWord"
              className="mb-2 text-lightBlack font-bold"
            >
              Admin Password
            </label>
            <input
              {...register("adminPWord", { required: "Password is required" })}
              type="password"
              name="adminPWord"
              placeholder="Input password admin will use to login"
              className="border border-lightGreen rounded-md p-2 block w-full"
            />
            {errors.adminPWord && (
              <p className="text-red-500 text-xs">
                {errors.adminPWord.message}
              </p>
            )}
          </div>

          {/* Permission checkboxes */}
          <div>
            <h3 className="text-green font-bold mt-2">Permissions</h3>
            <p className="mb-2 text-[#6e6e6e] text-[12px]">
              Choose what the Admin should be able to access:
            </p>
            {filteredRoles?.map((role) => (
              <div
                className="border border-lightGreen rounded-md flex mt-2 justify-between items-center px-2"
                key={role.id}
              >
                <div>
                  <h3 className="text-gray-800 font-semibold text-sm">
                    {role.name}
                  </h3>
                  <p className="text-gray-500 text-[12px]">
                    {role.description}
                  </p>
                </div>
                <label htmlFor={role.name}>
                  <input
                    type="checkbox"
                    id={role.id}
                    name={role.name}
                    checked={selectedRoleIds.includes(role.id)}
                    onChange={handleCheckboxChange}
                  />
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-green text-white mt-8 font-semibold block mx-auto w-[150px] p-2 rounded-md"
            disabled={isStaffPending}
          >
            {isStaffPending ? "Sending..." : "Send An Invite"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;