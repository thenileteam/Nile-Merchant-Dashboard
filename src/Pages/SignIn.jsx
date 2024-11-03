import React, { useState } from "react";
import { nilelogosolid } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://nile-microservices-auth.onrender.com/auth/login", {
        email,
        password,
      });

      // Navigate to the dashboard on successful login
      navigate("/dashboard");
    } catch (error) {
      // Handle error response
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Incorrect email or password");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="mt-28 mb-10">
        <div>
          <img
            src={nilelogosolid}
            alt=""
            className="flex justify-center mx-auto"
          />
          <h1 className="text-[#333333] text-center text-[24px] font-bold mt-8">
            Welcome To The Merchant Dashboard
          </h1>
        </div>

        {/* Input Fields */}
        <div className="flex justify-center mx-auto">
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
                className="mt-1 w-[450px] p-3 rounded-md border-[#333333] border-2 bg-white text-sm text-gray-700 shadow-sm"
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
                className="mt-1 w-[450px] p-3 rounded-md border-[#333333] border-2 bg-white text-sm text-gray-700 shadow-sm"
                required
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="flex items-center justify-center mx-auto gap-10">
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
                <span className="text-[14px] text-[#333333]">Remember Me</span>
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
              className="text-[#ffffff] bg-[#004324] w-full p-2 rounded-md mt-5"
            >
              Log In
            </button>

            <div className="flex items-center gap-1 justify-center mt-3">
              <h1 className="text-[#333333] text-[16px]">
                Don't Have An Account?
              </h1>
              <Link to="/signup">
                <p className="text-[#000000] font-bold">Click Here</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;