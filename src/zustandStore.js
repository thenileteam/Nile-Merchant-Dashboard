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
  //state for sidebar
  sidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
  closeSidebar: () => set({ sidebarOpen: false }),
   
  //state for opening policy
  policyOpen: false,
  openPolicy: () => set({ policyOpen: true }),
  closePolicy: () => set({
    policyOpen: false
  })
}));


 
