import{ create }from 'zustand';

export const useAssignLocationStore = create((set) => ({
    //i wanted to manage the form dropdowns separately, because i noticed that opening one dropdown in addStaff also opens the same dropdown in addProduct due to shared state
    formStates: {
      addStaff: { selectedLocation: null, isLocationAssigned: false },
      addProduct: { selectedLocation: null, isLocationAssigned: false },
    },
    setSelectedLocation: (formType, location) =>
      set((state) => ({
        formStates: {
          ...state.formStates,
          [formType]: { ...state.formStates[formType], selectedLocation: location, isLocationAssigned: !state.formStates[formType].isLocationAssigned },
        },
      })),
    setLocationAssigned: (formType) =>
      set((state) => ({
        formStates: {
          ...state.formStates,
          [formType]: { ...state.formStates[formType], isLocationAssigned: !state.formStates[formType].isLocationAssigned,},
        },
      })),
  }));
  
