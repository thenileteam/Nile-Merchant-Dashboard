/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
const UploadImage = ({ handleFileChange, style, image , parentStyle, labelFor}) => {

  return (
    <div className={`relative text-center ${parentStyle} lg:w-[308px] mx-auto`}>
      <input
        type="file"
        name= {labelFor}
        id= {labelFor}
        accept=".jpg,.png,.svg,.jpeg"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full hidden"
        required
        onChange={handleFileChange}
      />
      <label htmlFor={labelFor} className="cursor-pointer">
        <img
          src={image}
          className={`block ${style} `}
          alt="add image placeholder icon"
        />
      </label>
      {/* {uploadedFile && (
        <div className="flex justify-center items-center mt-2">
          <p>File name: {uploadedFile.name}</p>
          <button
            className="font-bold cursor-pointer ml-2"
            onClick={handleRemoveFile}
          >
            remove image &times;
          </button>
        </div>
      )} */}
    </div>
  );
};

export default UploadImage;