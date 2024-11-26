/* eslint-disable no-unused-vars */
import { nilelogosolid, eye } from "../assets";
import { useSearchParams } from "react-router-dom";
import LoginReviews from "../Components/LoginReviews/LoginReviews";
import CreateAccPaths from "../Components/CreateAccPaths/CreateAccPaths";
import { useShowPassword } from "../Context/Context";
import { toast } from "sonner";
import { useState } from "react";
import { useResetPassword } from "../datahooks/users/userhooks";

const ForgotPassword = () => {
  const { showPassword, handleShowPassword } = useShowPassword();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { _error, isPending, mutate } = useResetPassword(token);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Both fields are required");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const data = {
      password: newPassword,
      passwordConfirm: confirmPassword,
    };
    mutate(data);
  };

  return (
    <section>
      <div className="container md:max-w-[700px] lg:max-w-[1184px] mx-auto mt-28 lg:flex gap-[120px] items-center bg-dimWhite rounded-lg p-8 lg:p-16 shadow-md shadow-dimWhite">
        <div className="mb-10">
          <div>
            <img
              src={nilelogosolid}
              alt="nile logo"
              className="flex justify-center mx-auto w-[165.33px] max-w-full"
            />
            <h1 className="text-[#333333] text-center text-[24px] font-bold mt-8">
              Recreate Your Merchant Password
            </h1>
          </div>

          {/* Input Fields */}
          <div className="relative mx-auto">
            <form action="#" className="space-y-6 mt-6">
              <div className="relative">
                <label
                  htmlFor="NewPassword"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  New Password
                </label>

                <input
                  type={showPassword.newPassword ? "text" : "password"}
                  id="new_Password"
                  name="newPassword"
                  placeholder="Type new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 w-full p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                />
                <img
                  src={eye}
                  className="absolute top-11 right-3 w-3 h-3"
                  alt="hide password icon"
                  onClick={() => handleShowPassword("newPassword")}
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="Repeat Password"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  Repeat Password
                </label>

                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  id="repeat_Password"
                  name="confirmPassword"
                  placeholder="Type the same password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 w-full p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                />
                <img
                  src={eye}
                  className="absolute top-11 right-3 w-3 h-3"
                  alt="hide password icon"
                  onClick={() => handleShowPassword("confirmPassword")}
                />
              </div>

              {/* Reset Password Button */}

              <button
                type="button"
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="text-[#ffffff] mt-5 bg-[#004324] w-full p-2 rounded-md"
              >
                {isPending ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
          <CreateAccPaths
            text="Dont Have An Account ?"
            path="/signup"
            linkText="Create one"
          />
        </div>
        <LoginReviews />
      </div>
    </section>
  );
};

export default ForgotPassword;
