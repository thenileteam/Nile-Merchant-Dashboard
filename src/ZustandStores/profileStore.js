import { create } from "zustand";

export const useProfileStore = create((set) => ({
    isProfileOpen: false,
    toggleProfile: () => set((state) => ({ isProfileOpen: !state.isProfileOpen })),
   
}))