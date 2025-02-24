import { create } from "zustand";
export const useTransferStore = create((set) => ({
  isTransferOpen: false,
  setOpenTransfer: (value) =>
    set({
      isTransferOpen: value,
    }),
  
}));

export const useProductStore = create((set) => ({
  isPopupOpen: false,
  openPopup: () =>
    set({
      isPopupOpen: true,
    }),
  closePopup: () =>
    set({
      isPopupOpen: false,
    }),
}));

// export const useEditProductStore = create((set) => ({
//     isEditPopupOpen: false,
//     setIsEditPopupOpen: (value) =>
//       set({
//         isEditPopupOpen: value,
//       }),
    
//   }));

export const useEditProductStore = create((set) => ({
  editingProduct: null,
  setEditingProduct: (product) => set({ editingProduct: product }),
  closeEditingProduct: () => set({ editingProduct: null }),
}));

