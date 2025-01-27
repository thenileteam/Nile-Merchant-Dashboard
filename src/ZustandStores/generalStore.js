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