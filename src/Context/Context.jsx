import { createContext, useContext, useState } from "react";

// Created the context to use
const ShowPasswordContext = createContext();

// Custom hook to use the context
export const useShowPassword = () => useContext(ShowPasswordContext);


//The provider component
export const ShowPasswordProvider = ({ children }) => {
    const [showPassword, setShowPassword] = useState({  password: false, // For SignInPage
        password1: false, // For SignUpPage
        password2: false, // For SignUpPage
        newPassword: false, // For ForgotPasswordPage
        confirmPassword: false,});
    const handleShowPassword = (passwordKey) => {
        setShowPassword(((prevVisibility) => ({
            ...prevVisibility,
            [passwordKey]: !prevVisibility[passwordKey],
        })))
        
    }

  return (
    <ShowPasswordContext.Provider value={{ showPassword, handleShowPassword }}>
      {children}
    </ShowPasswordContext.Provider>
  );
};
