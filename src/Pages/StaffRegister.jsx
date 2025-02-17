import LoginReviews from "@/Components/LoginReviews/LoginReviews";
import { nilelogosolid, eye, lashesIcon } from "../assets";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useShowPasswordStore } from "../ZustandStores/showPasswordStore";
import { useForm } from "react-hook-form";
import { useStore } from "@/ZustandStores/generalStore";
import { Link } from "react-router-dom";
import { useFetchStaffs } from "@/datahooks/staffs/usestaffhook";

const StaffRegister = () => {
  const { store } = useStore();
  const { showPassword, handleShowPassword } = useShowPasswordStore();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
    const staffId = searchParams.get("staffId");
    console.log(staffId)
    const { staffs } = useFetchStaffs()
    const staff = staffs?.find((item)=>item?.id === staffId)
    console.log(staff)
  
  // Redirect user if no staffId is found
  //   useEffect(() => {
  //     if (!staffId) {
  //       navigate("/"); // Redirects to homepage if staffId is missing
  //     }
  //   }, [staffId, navigate]);
  const submitStaffDetails = (data) => {
      const newData = {
          name: staff.name,
          email: staff.email,
          staffId: staffId,
          isStaff: true,
          branchId:staff.locationId

      }
  };
  return (
    <section className="h-screen">
      <div className="container md:max-w-[700px] lg:max-w-[1184px] mx-auto mt-28 lg:flex lg:gap-[100px] items-center bg-dimWhite rounded-lg p-4 lg:p-16 shadow-md shadow-gray-300">
        <article className="mb-10 lg:w-[60%]">
          <div>
            <img
              src={nilelogosolid}
              alt="nile logo"
              className="flex justify-center mx-auto w-[165px] max-w-full"
            />
            <h1 className="text-[#333333] text-center text-[24px] font-bold mt-8">
              Welcome To{" "}
              <span className="text-lightGreen font-bold capitalize">{`${
                store?.name || "my Store"
              }'s`}</span>{" "}
              Store on Nile
            </h1>
            <p className="text-center text-[#6E6E6E] text-[20px] font-semibold">
              Before you begin, set up your login credentials to access your
              dashboard.
            </p>
            {/* Show staff ID for debugging or user confirmation */}
            {/* <p className="text-center text-gray-500 text-sm">
                Staff ID: {staffId}
              </p> */}
          </div>

          <form>
            <div className="relative">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="*******"
                className="mt-1 w-full p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
              />
              <img
                src={showPassword.password ? lashesIcon : eye}
                alt="toggle password visibility"
                className="absolute top-11 right-2 w-7 h-4 cursor-pointer"
                onClick={() => handleShowPassword("password")}
              />
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                placeholder="********"
                className="mt-1 w-full p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
              />
              <img
                src={showPassword.confirmPassword ? lashesIcon : eye}
                alt="toggle password visibility"
                className="absolute top-11 right-2 w-7 h-4 cursor-pointer"
                onClick={() => handleShowPassword("confirmPassword")}
              />
            </div>

            <button
              type="submit"
              className="mx-auto block bg-green rounded-md text-white w-full py-3 text-center text-[14px] mt-4 font-semibold"
            >
              Complete Setup
            </button>
            <Link to="/">Login</Link>
          </form>
        </article>
        <LoginReviews />
      </div>
    </section>
  );
};

export default StaffRegister;
