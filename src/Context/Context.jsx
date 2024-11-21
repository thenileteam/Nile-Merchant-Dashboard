/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

// Created the context to use
const ShowPasswordContext = createContext();

// Custom hook to use the context
export const useShowPassword = () => useContext(ShowPasswordContext);

//The provider component
export const ShowPasswordProvider = ({ children }) => {
  const [showPassword, setShowPassword] = useState({
    password: false, // For SignInPage
    password1: false, // For the first password field on SignUpPage
    password2: false, // For second field on the SignUpPage
    newPassword: false, // For ForgotPasswordPage
    confirmPassword: false,
  });
  const handleShowPassword = (id) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: prev[id] ? false : true,
    }));
  }

  return (
    <ShowPasswordContext.Provider value={{ showPassword, handleShowPassword }}>
      {children}
    </ShowPasswordContext.Provider>
  );
};
