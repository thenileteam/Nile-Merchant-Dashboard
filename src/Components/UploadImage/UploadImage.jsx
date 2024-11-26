import { useFileStore } from "../../zustandStore";

const UploadImage = ({ image }) => {
  // product image upload and state in zustand store
  const { uploadedFile, handleFileChange, handleRemoveFile } = useFileStore();
  return (
    <div className="relative text-center mt-10 lg:w-[308px] mx-auto">
      <input
        type="file"
        name=""
        id="file-input"
        accept=".jpg,.png,.svg,.jpeg"
        className="absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full hidden"
        required
        onChange={handleFileChange}
      />
      <label htmlFor="file-input" className="cursor-pointer">
        <img
          src={uploadedFile ? URL.createObjectURL(uploadedFile) : image}
          className="block mx-auto"
          alt="add image icon"
        />
      </label>
      {uploadedFile && <p>File name: {uploadedFile.name}  </p>}
      {uploadedFile&& <button className="font-bold cursor-pointer" onClick={handleRemoveFile}> remove image &times;</button>}
      
    </div>
  );
};

export default UploadImage;
