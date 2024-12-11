import { create } from 'zustand';
import {toast} from 'sonner'
export const useUserStore = create((set) => ({
  showPassword:{
    password: false, // For SignInPage
    password1: false, // For the first password field on SignUpPage
    password2: false, // For second field on the SignUpPage
    newPassword: false, // For ForgotPasswordPage
    confirmPassword: false,
  },

   handleShowPassword: (id) => {
    set((state) => ({
      showPassword: {
        ...state.showPassword,
        [id]: state.showPassword[id] ? false : true,
      },
    }))
  },
  //state for form validation
  formDetails: {},

  // Set initial values for form details
  setInitialFormDetails: (initialValues) =>
    set(() => ({
      formDetails: { ...initialValues },
    })),
  
  //update form 
  updateFormField: (field, value) =>
    set((state) => ({
      formDetails: {
        ...state.formDetails,
        [field]: value,
      },
    })),

  //handle  validating form
  validateForm: (requiredFields) => {
    const { formDetails } = useStore.getState(); // Access state directly
    const errors = [];

    requiredFields.forEach((field) => {
      if (!formDetails[field]?.trim()) {
        errors.push(`Please provide ${field.replace("_", " ").toUpperCase()}`);
      }
    });

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }

    return true;
  },
  
}));


 
