import { useEffect, useState,useRef } from "react";
import { nilelogosolid, eye, lashesIcon } from "../assets";
import { useSignUserUp } from "../datahooks/users/userhooks";
import { useShowPassword } from "../Context/Context";
import { toast } from "sonner";
import LoginReviews from "../Components/LoginReviews/LoginReviews";
import CreateAccPaths from "../Components/CreateAccPaths/CreateAccPaths";

const SignUp = () => {
  // Custom context hook
  const { showPassword, handleShowPassword } = useShowPassword();
  const [step, setStep] = useState(false); // Default to Step 1
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    storeName: "",
    storeURL: "",
    marketing_accept: false,
  });

  const { signUpMutate, } = useSignUserUp();

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      toast.error("Passwords do not match.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    signUpMutate(data);
  };

  // Validate form before proceeding to Step 2
  const validateForm = () => {
    const { name, email, storeName,marketing_accept } = formData;
    //check if checkbox is clicked too
    if (!name || !email || !storeName || marketing_accept!==true) {
      toast.error("Please fill in all fields before proceeding.");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    toast.success("Proceeding to Step 2...");
    setStep(true); // Move to Step 2
    return true;
  };

  // Reset formData when step changes
  useEffect(() => {
    if (!step) {
      setFormData({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        storeName: "",
        storeURL: "",
        marketing_accept: false,
      });
    }
  }, [step]);

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
            <strong className="text-lightGreen text-center block mt-2">
              {step ? "Step 2 of 2" : "Step 1 of 2"}
            </strong>
          </div>

          <div className="mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6 mt-6">
              {step ? (
                <>
                  {/* Step 2 Inputs */}
                  <div className="relative">
                    <label htmlFor="Password" className="block text-[16px] font-bold text-[#333333]">
                      Password
                    </label>
                    <input
                      type={showPassword.password1 ? "text" : "password"}
                      id="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="********"
                      className="mt-1 w-full p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                    />
                    <img
                      src={showPassword.password1 ? lashesIcon : eye}
                      alt="toggle password visibility"
                      className="absolute top-11 right-2 w-7 h-4 cursor-pointer"
                      onClick={() => handleShowPassword("password1")}
                    />
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
                      value={formData.passwordConfirm}
                      onChange={handleChange}
                      placeholder="Type password again"
                      className="mt-1 w-full p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                    />
                    <img
                      src={showPassword.password2 ? lashesIcon : eye}
                      alt="toggle password visibility"
                      className="absolute top-11 right-2 w-7 h-4 cursor-pointer"
                      onClick={() => handleShowPassword("password2")}
                    />
                  </div>
                 
                </>
              ) : (
                <>
                  {/* Step 1 Inputs */}
                  <div>
                    <label htmlFor="FullName" className="block text-[16px] font-bold text-[#333333]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="FullName"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your Full Name"
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
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your Email Address"
                      className="mt-1 w-full p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="StoreName" className="block text-[16px] font-bold text-[#333333]">
                      Store Name
                    </label>
                    <input
                      type="text"
                      id="StoreName"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleChange}
                      placeholder="Enter Your Store Name"
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
                    checked={formData.marketing_accept}
                    onChange={handleChange}
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />
                  <span className="text-[14px] text-[#333333]">
                    Agreed To The Terms And Conditions
                  </span>
                </label>
              </div>

              {step ? (
                <button
                  type="submit"
                  className="text-[#ffffff] bg-[#004324] w-full py-4 text-center text-[14px] font-semibold rounded-md shadow-md"
                >
                  Sign Up
                </button>
              ) : (
                <button
                  type="button"
                  onClick={validateForm}
                  className="text-[#ffffff] bg-[#004324] w-full py-4 text-center text-[14px] font-semibold rounded-md shadow-md"
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
