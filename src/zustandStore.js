import { create } from 'zustand';

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
  }
  
}));


 
