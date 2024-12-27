import { create } from 'zustand'
export const usePolicyStore = create((set) => ({
    //state for opening policy
  policyOpen: false,
  openPolicy: () => set({ policyOpen: true }),
  closePolicy: () =>
    set({
      policyOpen: false,
    }), 
}))