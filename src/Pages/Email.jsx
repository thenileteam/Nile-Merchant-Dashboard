/* eslint-disable no-unused-vars */
import { nilelogosolid } from "../assets";
import { Link } from "react-router-dom";
import LoginReviews from "../Components/LoginReviews/LoginReviews";
import CreateAccPaths from "../Components/CreateAccPaths/CreateAccPaths";
import { useForgetPassword } from "../datahooks/users/userhooks";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Email = () => {
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(0);
  const { mutate, isPending, error } = useForgetPassword();

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const validateMail = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return false;
    }
    // Simulate mutation success
    mutate(
      { email },
      {
        onSuccess: () => {
          toast.success("Email sent! You can resend after 60 seconds.");
          setCountdown(60); // Start a 60-second countdown
        },
      }
    );
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!countdown) validateMail();
  };

  return (
    <>
      <div className="container md:max-w-[700px] lg:max-w-[1184px] mx-auto mt-28 lg:flex gap-[120px] items-center bg-dimWhite rounded-lg lg:shadow-md lg:shadow-gray-300 p-8 lg:p-16">
        <div className="mb-10">
          <div>
            <img
              src={nilelogosolid}
              alt=""
              className="flex justify-center mx-auto w-[165.33px] max-w-full"
            />
            <h1 className="text-[#333333] text-center text-[24px] font-bold mt-8">
              Recreate Your Merchant Password
            </h1>
          </div>

          {/* Input Fields */}
          <div className=" mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              <div>
                <label
                  htmlFor="EmailAddress"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  Email Address
                </label>

                <input
                  type="email"
                  id="EmailAddress"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email_address"
                  placeholder="mail@gmail.com"
                  className="mt-1 w-full block p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                  disabled={countdown > 0}
                />
              </div>

              {/* Reset Password Button */}
              <div className="mt-5">
                <button
                  type="submit"
                  className="text-[#ffffff] bg-[#004324] w-full block p-2 rounded-md"
                  disabled={isPending || countdown > 0}
                >
                  {isPending
                    ? "Sending..."
                    : countdown > 0
                    ? `Wait ${countdown}s`
                    : "Send Link"}
                </button>
              </div>
            </form>
          </div>
          <CreateAccPaths
            text="Dont Have An Account ?"
            path="/signup"
            linkText="Create One"
          />
        </div>
        <LoginReviews />
      </div>
    </>
  );
};

export default Email;
