/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { nilelogosolid } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import LoginReviews from "../Components/LoginReviews/LoginReviews";
import CreateAccPaths from "../Components/CreateAccPaths/CreateAccPaths";
import { useSignUserUp } from "../datahooks/users/userhooks";

const SignUp = () => {
  const [step, setStep] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    storeName: "",
    image: null,
    marketing_accept: false,
  });
  const { signUpMutate, signUpError, signUpIsPending } = useSignUserUp();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
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

    try {
      const response = await axios.post(
        "https://nile-microservices-auth.onrender.com/auth/register",
        formData
      );

      // Navigate to dashboard on success
      navigate("/");
    } catch (error) {
      // Handle errors from the response
      if (error.response) {
        alert(
          error.response.data.message || "Signup failed. Please try again."
        );
      } else {
        alert("An error occurred. Please try again.");
        console.error(error);
      }
    }
    signUpMutate(data);
  };

  return (
    <section>
      <div className="container lg:max-w-[1184px] mx-auto mt-28 lg:flex gap-[120px] items-center bg-dimWhite rounded-lg p-8 lg:p-16">
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
              {/* conditionally rendering the input fields for the sign up steps */}
              {step ? (
                <>
                  <div className="">
                    <label
                      htmlFor="Password"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="Password"
                      name="password"
                      placeholder="********"
                      onChange={handleChange}
                      className="mt-1 w-full p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="RepeatPassword"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Repeat Password
                    </label>
                    <input
                      type="password"
                      id="RepeatPassword"
                      name="passwordConfirm"
                      placeholder="********"
                      onChange={handleChange}
                      className="mt-1 w-full p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ProfileImage"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Add Profile Image
                    </label>
                    <div className="mt-1">
                      <label
                        htmlFor="ProfileImage"
                        className="block w-full p-3 text-sm text-gray-400 bg-white border-lightGreen border rounded-md cursor-pointer shadow-sm"
                      >
                        Choose Image
                      </label>
                      <input
                        type="file"
                        id="ProfileImage"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
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
                      className="mt-1 w-full p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
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
                      className="mt-1 w-full p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
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

              {/* Sign Up Button */}
              {step ? (
                <button
                  type="submit"
                  className="text-[#ffffff] bg-[#004324] w-full p-2 rounded-md mt-5"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  type="button"
                  className="text-[#ffffff] bg-[#004324] w-full p-2 rounded-md mt-5"
                  onClick={() => setStep(true)}
                >
                  Continue
                </button>
              )}
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
