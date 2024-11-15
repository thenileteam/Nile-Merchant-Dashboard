import { useState } from "react";
import { nilelogosolid } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import LoginReviews from "../Components/LoginReviews/LoginReviews";
import CreateAccPaths from "../Components/CreateAccPaths/CreateAccPaths";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://nile-microservices-auth.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      // Store the authentication token (assuming it's in response.data.token)
      localStorage.setItem("authToken", response.data.token);

      // You might also want to store user data if it's included in the response
      localStorage.setItem("userData", JSON.stringify(response.data.user));

      // Then navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data.message || "Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    //update
    <section className="h-screen">
      <div className="container lg:max-w-[1184px] mx-auto mt-28 lg:flex gap-[120px] items-center bg-dimWhite rounded-2xl lg:shadow-md lg::shadow-gray-300 p-4 lg:p-16">
        <div className="mb-10">
          <div className="">
            <img
              src={nilelogosolid}
              alt="nile-logo"
              className="flex justify-center mx-auto w-[165.33px] max-w-full"
            />
            <h1 className="text-[#333333] text-center text-[24px] font-bold mt-8">
              Welcome To The Merchant Dashboard
            </h1>
          </div>

          <div className=" mx-auto">
            <form onSubmit={handleLogin} className="space-y-6 mt-6">
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
                  placeholder="Ashimiuade@gmail.com"
                  className="mt-1 w-full lg:w-[450px] p-3 rounded-md border-lightGreen border bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              <div>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*******"
                  className="mt-1 w-full lg:w-[450px] p-3 rounded-md border border-lightGreen bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div>

              {error && <p className="text-red-500 text-center">{error}</p>}

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
                    <p className="text-[#000000] font-bold">Click Here</p>
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="text-[#ffffff] bg-[#004324] w-full p-2 rounded-md mt-5 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Log In"
                )}
              </button>

              <CreateAccPaths
                text="Don't Have An Account ?"
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
