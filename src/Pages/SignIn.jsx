import { useEffect, useState } from "react";
import { nilelogosolid, eye } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import LoginReviews from "../Components/LoginReviews/LoginReviews";
import CreateAccPaths from "../Components/CreateAccPaths/CreateAccPaths";
import { useLogUserIn } from "../datahooks/users/userhooks";
import Cookies from "js-cookie";
import {useShowPasswordStore} from '../ZustandStores/showPasswordStore'
const SignIn = () => {
  const navigate = useNavigate();
  const [checkingUser, setCheckingUser] = useState(true);
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const store = localStorage.getItem("store");
    if (accessToken && store !== null) {
      setCheckingUser(false);
      navigate("/dashboard");
    }
    setCheckingUser(false);
  }, [navigate]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error messages

  const { showPassword, handleShowPassword } = useShowPasswordStore();
  const { mutate, isPending } = useLogUserIn();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation for empty fields
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError(""); // Clear error if validation passes

    try {
      mutate({
        email,
        password,
      });
     
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  if (checkingUser) return null;
  return (
    <section className="h-screen">
      <div className="container md:max-w-[700px] lg:max-w-[1184px] mx-auto mt-28 lg:flex gap-[120px] items-center bg-dimWhite rounded-2xl lg:shadow-md lg:shadow-gray-300 p-4 lg:p-16">
        <div className="mb-10">
          <div>
            <img
              src={nilelogosolid}
              alt="nile-logo"
              className="flex justify-center mx-auto w-[165.33px] max-w-full"
            />
            <h1 className="text-[#333333] text-center text-[24px] font-bold mt-8">
              Welcome To The Merchant Dashboard
            </h1>
          </div>
          <div className="mx-auto">
            <form onSubmit={handleLogin} className="space-y-6 mt-6">
              {/* Display error message */}
              {error && (
                <div className="bg-red-100 text-red-700 p-2 rounded-md">
                  {error}
                </div>
              )}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Input email here"
                  className="mt-1 w-full lg:w-[450px] p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="Password"
                  className="block text-[16px] font-bold text-[#333333]"
                >
                  Password
                </label>
                <input
                  type={showPassword.password ? "text" : "password"}
                  id="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type password"
                  className="mt-1 w-full lg:w-[450px] p-3 rounded-md border border-lightGreen bg-white text-sm text-gray-700 shadow-sm"
                />
                <img
                  src={eye}
                  className="absolute top-11 right-3 w-3 h-3"
                  alt="hide password icon"
                  onClick={() => handleShowPassword("password")}
                />
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-center mx-auto md:gap-10">
                <label
                  htmlFor="MarketingAccept"
                  className="flex gap-1 items-center"
                >
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />
                  <span className="text-[14px] text-[#333333]">
                    Remember Me
                  </span>
                </label>
                <div className="flex items-center gap-1">
                  <h1 className="text-[#333333] text-[14px]">
                    Forgotten Password?
                  </h1>
                  <Link to="/email">
                    <p className="text-lightGreen font-bold">Click Here</p>
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="text-[#ffffff] bg-[#004324] w-full p-2 rounded-md mt-5 flex items-center justify-center"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Log In"
                )}
              </button>

              <CreateAccPaths
                text="Don't Have An Account?"
                path="/signup"
                linkText="Click Here"
              />
            </form>
          </div>
        </div>
        <LoginReviews />
      </div>
    </section>
  );
};

export default SignIn;
