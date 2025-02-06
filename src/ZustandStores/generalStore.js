import { create } from "zustand";
export const useStore = create((set) => ({
    store: JSON.parse(localStorage.getItem('store')) || null,
    setStore: (newStore) => {
      set({ store: newStore });
      localStorage.setItem('store', JSON.stringify(newStore)); // Persist to localStorage
    },
    clearStore: () => {
      set({ store: null });
      localStorage.removeItem('store'); // Clear store 
    }
}));
  

export const useCardStore = create((set) => ({
  delCard: false,
  toggleDelCard:()=>set((state)=>({delCard:!state.delCard})),
  openDelCard:()=>set({ delCard:true}),
  closeDelCard:()=>set({ delCard:false})
}))