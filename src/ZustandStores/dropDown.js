 import { create } from "zustand";

export const useDropDown = create((set) =>( {
    isDropdownOpen: false,
    setIsDropdownOpen: () => {
        set(state=>({ isDropdownOpen: !state.isDropdownOpen }))
    }
})
 )