/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

// Created the context to use
const ShowPasswordContext = createContext();
const FormContext= createContext()
// Custom hook to use the context
export const useShowPassword = () => useContext(ShowPasswordContext);
export const useFormContext = () => useContext(FormContext)

//The provider component
export const ShowPasswordProvider = ({ children }) => {
  const [inputErrorMsg, setInputErrorMsg] = useState("");
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
  //check if the input fields are empty
  const handleShowError = (e) => {
    const newFormData = new FormData(e.target)
    const email = newFormData.get('email')
    const password = newFormData.get('password')
    const newPassword = newFormData.get('NewPassword')
    const repeatPassword = newFormData.get('RepeatPassword')
    const isValuePresent = !email|| !password||!confirmPassword||!newPassword
    if (isValuePresent){
      setInputErrorMsg('Input fields cannot be empty!')
    }else{setInputErrorMsg('')}
  }
  return (
    <ShowPasswordContext.Provider value={{ showPassword, handleShowPassword}}>
      <FormContext.Provider
        value={{
          handleShowError, inputErrorMsg,
        }}
      >
        {children}
      </FormContext.Provider>
    </ShowPasswordContext.Provider>
  );
};

