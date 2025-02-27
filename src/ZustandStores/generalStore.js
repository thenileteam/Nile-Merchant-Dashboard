import { create } from "zustand";
import { persist } from "zustand/middleware";


// export const useStore = create(
//   persist(
//     (set) => ({
//       // Store state
//       store: { id: null, name: null }, // Default value for store
//       setStore: (newStore) => set({ store: newStore }),

//       // Staff state
//       staff: { id: null, name: null, roles: [] }, // Default value for staff
//       setStaff: (newStaff) => set({ staff: newStaff }),

//       // Clear state (for logout)
//       clearState: () =>
//         set({
//           store: { id: null, name: null }, // Reset to default value
//           staff: { id: null, name: null, roles: [] }, // Reset to default value
//         }),
//     }),
//     {
//       name: "app-storage", // Unique name for the storage
//       getStorage: () => localStorage, // Using localStorage for persistence
//     }
//   )
// );


export const useStore = create((set) => ({
  store: JSON.parse(localStorage.getItem('store')) || null,
  staff: null,
  userData: null,
  setUserData: (data) => set({ userData: data }),
  setStaff: (newStaff) => set({ staff:newStaff }),
    setStore: (newStore) => {
      set({ store: newStore });
      localStorage.setItem('store', JSON.stringify(newStore)); // Persist to localStorage
    },
    clearStore: () => {
      set({ store: null });
      localStorage.removeItem('store'); // Clear store 
  },
  clearStaff: () => set({ staff: null })
  
}));
  

export const useCardStore = create((set) => ({
  delCard: false,
  toggleDelCard:()=>set((state)=>({delCard:!state.delCard})),
  openDelCard:()=>set({ delCard:true}),
  closeDelCard:()=>set({ delCard:false})
}))