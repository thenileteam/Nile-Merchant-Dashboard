import React from "react";
import { nilelogosolid } from "../assets";
import { Link } from "react-router-dom";
import LoginReviews from "../Components/LoginReviews/LoginReviews";
import CreateAccPaths from "../Components/CreateAccPaths/CreateAccPaths";

const ForgotPassword = () => {
  return (
    <section>
      <div className="container lg:max-w-[1184px] mx-auto mt-28 lg:flex gap-[120px] items-center bg-dimWhite rounded-lg">
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
          <div className="flex justify-center mx-auto">
            <form action="#" className="space-y-6 mt-6">
              <div>
                <label
                  htmlFor="NewPassword"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  New Password
                </label>

                <input
                  type="password"
                  id="new_Password"
                  name="password"
                  placeholder="*******"
                  className="mt-1 w-[450px] p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="Repeat Password"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  Repeat Password
                </label>

                <input
                  type="password"
                  id="repeat_Password"
                  name="password"
                  placeholder="*******"
                  className="mt-1 w-[450px] p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              {/* Reset Password Button */}
              <Link to="/">
                <div className="mt-5">
                  <button className="text-[#ffffff] bg-[#004324] w-full p-2 rounded-md">
                    Reset Password
                  </button>
                </div>
              </Link>
            </form>
          </div>
            <CreateAccPaths text='Dont Have An Account ?' path='/signup' linkText='Create one'/>
        </div>
        <LoginReviews />
      </div>
    </section>
  );
};

export default ForgotPassword;
