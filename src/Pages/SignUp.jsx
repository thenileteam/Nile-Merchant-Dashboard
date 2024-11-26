/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { nilelogosolid, eye, lashesIcon } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import LoginReviews from "../Components/LoginReviews/LoginReviews";
import CreateAccPaths from "../Components/CreateAccPaths/CreateAccPaths";
import { useSignUserUp } from "../datahooks/users/userhooks";
import { useShowPassword } from "../Context/Context";

const SignUp = () => {
  //custom context hook
  const { showPassword, handleShowPassword } = useShowPassword();
  const [step, setStep] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    storeName: "",
    storeURL: "",
    marketing_accept: false,
  });
  //check if all input fields av been field b4 enabling the submit button
  // const isFormValid =
  //   formData.name &&
  //   formData.email &&
  //   formData.password &&
  //   formData.passwordConfirm &&
  //   formData.storeName &&
  //   formData.storeURL;
  
  //backend checks
  const { signUpMutate, signUpError, signUpIsPending } = useSignUserUp();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
   

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure passwords match
    if (formData.password !== formData.passwordConfirm) {
      alert("Passwords do not match.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    signUpMutate(data);
  };

  return (
    <section>
      <div className="container md:max-w-[700px] lg:max-w-[1184px] mx-auto mt-28 lg:flex gap-[120px] items-center bg-dimWhite rounded-lg p-8 lg:p-16 shadow-md shadow-gray-300">
        <article className="mb-10">
          <div>
            <img
              src={nilelogosolid}
              alt="nile logo"
              className="flex justify-center mx-auto w-[165px] max-w-full"
            />
            <h1 className="text-[#333333] text-center text-[24px] font-bold mt-8">
              Create Your Store Owner Account
            </h1>
            <p className="text-center text-[#6E6E6E] text-[20px] font-semibold">
              Join Our platform And Start Managing Your Store Effortlessly!
            </p>
            {/* conditionally rendering the text to show for each steps that is rendered */}
            {step ? (
              <strong className="text-lightGreen text-center block mt-2">
                Step 2 of 2
              </strong>
            ) : (
              <strong className="text-lightGreen text-center block mt-2">
                Step 1 of 2
              </strong>
            )}
          </div>

          {/* Input Fields */}
          <div className="mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              {/* conditionally rendering 3 input fields at a time for the sign up steps */}
              {step? (
                <>
                  <div className="relative">
                    <label
                      htmlFor="Password"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Password
                    </label>
                    <input
                      type={showPassword.password1 ? "text" : "password"}
                      id="Password"
                      name="password"
                      placeholder="********"
                      onChange={handleChange}
                      className="mt-1 w-full p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                    />
                    {showPassword.password1 ? (
                      <img
                        src={lashesIcon}
                        className="absolute top-11 right-2 w-10 h-5 "
                        alt="hide password icon"
                        loading="lazy"
                        onClick={() => handleShowPassword("password1")}
                      />
                    ) : (
                      <img
                        src={eye}
                        className="absolute top-11 right-2 w-7 h-4"
                        alt="hide password icon"
                        loading="lazy"
                        onClick={() => handleShowPassword("password1")}
                      />
                    )}
                  </div>
                  <div className="relative">
                    <label
                      htmlFor="RepeatPassword"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Repeat Password
                    </label>
                    <input
                      type={showPassword.password2 ? "text" : "password"}
                      id="RepeatPassword"
                      name="passwordConfirm"
                      placeholder="Type password again"
                      onChange={handleChange}
                      className="mt-1 w-full p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                    />
                    {showPassword.password2 ? (
                      <img
                        src={lashesIcon}
                        className="absolute top-11 right-2 w-10 h-5"
                        alt="hide password icon"
                        loading="lazy"
                        onClick={() => handleShowPassword("password2")}
                      />
                    ) : (
                      <img
                        src={eye}
                        className="absolute top-11 right-2 w-7 h-4 "
                        alt="hide password icon"
                        loading="lazy"
                        onClick={() => handleShowPassword("password2")}
                      />
                    )}
                  </div>

                 
                </>
              ) : (
                <>
                  <div className=" ">
                    <label
                      htmlFor="FullName"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="FullName"
                      name="name"
                      placeholder="Enter your Full Name"
                      onChange={handleChange}
                      className="mt-1 w-full p-3 rounded-md border border-lightGreen bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>
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
                      name="email"
                      placeholder="Enter your Email Address"
                      onChange={handleChange}
                      className={"mt-1 w-full p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="StoreName"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Store Name
                    </label>
                    <input
                      type="text"
                      id="StoreName"
                      name="storeName"
                      placeholder="Enter Your Store Name"
                      onChange={handleChange}
                      className="mt-1 w-full p-3 rounded border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>
                </>
              )}

              <div className="mx-auto justify-center flex">
                <label htmlFor="MarketingAccept" className="flex gap-1">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    onChange={handleChange}
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />
                  <span className="text-[14px] text-[#333333]">
                    Agreed To The Terms And Conditions
                  </span>
                </label>
              </div>

              {/* Sign Up Button  -- you can only continue if the step is true and the form is filled*/}

              {step ? (
                <button
                  type="submit"
                  className={"text-[#ffffff] grid place-items-center bg-[#004324] w-full p-2 rounded-md mt-5"}
                  disabled={signUpIsPending}
                >
                  {signUpIsPending ? (
                    <div className="w-4 disabled:bg-opacity-30 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  className="text-[#ffffff] bg-[#004324] w-full p-2 rounded-md mt-5"
                  onClick={(e) => {
                    setStep(true);
                    e.preventDefault();
                  }}
                >
                  Continue
                </button>
              )}
              {/* if the input fields are not filled  and the step is true then show the error message */}
              {/* {!isFormValid && <p className="text-red-600 font-medium">Input fields cannot be empty!</p>} */}
            </form>
            <CreateAccPaths
              text="Already Have An Account ?"
              path="/"
              linkText="Click Here"
            />
          </div>
        </article>
        <LoginReviews />
      </div>
    </section>
  );
};

export default SignUp;
