import { create } from 'zustand'

export const useCategoryStore = create((set) => ({
    //state related to category adding and editing
  // default empty category
  categoryDetails: {
    categoryName: "",
    categoryDescription: "",
  },

  // Function to initialize the state with category data on edit
  setCategoryDetails: (category) =>
    set(() => ({
      categoryDetails: {
        categoryName: category?.name || "",
        categoryDescription: category?.description || "",
      },
    })),

  // Function to handle input changes
  handleCategoryChange: (e) => {
    const { name, value } = e.target;
    set((state) => ({
      categoryDetails: {
        ...state.categoryDetails,
        [name]: value,
      },
    }));
  },
}))