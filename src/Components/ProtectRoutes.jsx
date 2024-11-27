/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { LuLoader2 } from "react-icons/lu";

const ProtectRoutes = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Set initial state to null to indicate loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    const store = localStorage.getItem("store");
    setIsLoggedIn(!!accessToken && store !== null);
    setLoading(false);
  }, []);

  // If still loading, show the loader
  if (loading) {
    return (
      <div className="fixed w-full h-screen grid place-items-center">
        <LuLoader2 className="animate-spin duration-300" />
      </div>
    );
  }

  // If not logged in, redirect and do not render children
  if (!isLoggedIn) {
    navigate("/", { replace: true });
    return null; // Return null to avoid rendering the children when not logged in
  }

  // Render children if logged in
  return children;
};

export default ProtectRoutes;
