import React from "react";
import { nilelogosolid } from "../assets";
import { Link } from "react-router-dom";
import LoginReviews from "../Components/LoginReviews/LoginReviews";
import CreateAccPaths from "../Components/CreateAccPaths/CreateAccPaths";

const Email = () => {
  return (
    <>
      <div className="container lg:max-w-[1184px] mx-auto mt-28 lg:flex gap-[120px] items-center bg-dimWhite rounded-lg lg:shadow-md lg:shadow-gray-300 p-8 lg:p-16">
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
            <form action="#" className="space-y-6 mt-6">
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
                  name="email_address"
                  placeholder="Ashimiuade@gmail.com"
                  className="mt-1 w-full block p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              {/* Reset Password Button */}
              <Link to="/forgotpassword">
                <div className="mt-5">
                  <button className="text-[#ffffff] bg-[#004324] w-full block p-2 rounded-md">
                    Send Link
                  </button>
                </div>
              </Link>
            </form>
          </div>
            <CreateAccPaths text='Dont Have An Account ?' path='/signup' linkText='Create One'/>
        </div>
        <LoginReviews/>
      </div>
    </>
  );
};

export default Email;
