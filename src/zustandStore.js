import { create } from 'zustand';

export const useFileStore = create((set) => ({
  uploadedFile: null,
  setUploadedFile: (file) => set({ uploadedFile: file }),
  //handling file uploads
  handleFileChange: (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validExtensions = /\.(jpg|jpeg|png|svg)$/i; // Case-insensitive regex

      if (!validExtensions.test(file.name)) {
        alert("Invalid file type. Please upload a JPG, PNG, SVG, or JPEG image.");
        return; // Exit without setting the file
      }
       
      set({ uploadedFile: file });
    }
  },
  handleRemoveFile: () => set({ uploadedFile: null }),
}));


 
