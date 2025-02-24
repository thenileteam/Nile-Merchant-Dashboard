/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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
      <div className="flex justify-center mx-auto min-h-screen w-full items-center">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin"></div>
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
