import { create } from 'zustand';

export const useUserStore = create((set) => ({
  uploadedFile: null, // Stores the uploaded file
  userImage: null, // Stores the user's profile image URL
  setUploadedFile: (file) => set({ uploadedFile: file }),
  setUserImage: (url) => set({ userImage: url }),
  handleFileChange: (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validExtensions = /\.(jpg|jpeg|png|svg)$/i;

      if (!validExtensions.test(file.name)) {
        alert("Invalid file type. Please upload a JPG, PNG, SVG, or JPEG image.");
        return;
      }
      set({ uploadedFile: file });
    }
  },
  handleRemoveFile: () => set({ uploadedFile: null }),

  //username functionalities
  username: "", // Initial state
  setUsername: (name) => set({ username: name }),

  loadUsernameFromLocalStorage: () => {
    const storedUsername = localStorage.getItem("ownerName");
    if (storedUsername) {
      set({ username: JSON.parse(storedUsername) });
    }
  },
}));


 
