import create from 'zustand';
export const useLocationStore = create((set) => ({
    location: null, // Will hold the full location object
    setLocation: (location) => set({ location }), // Update the full location
    clearLocation: () => set({ location: null }), // Clear the location
  }));
