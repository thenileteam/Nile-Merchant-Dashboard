import {useState} from 'react'
import {useDeleteCategory} from '../../datahooks/products/productshooks'
const DeleteCategory = ({category}) => {
  const [delCategory , setDelCategory]= useState(false)
  const{deleteCategory, isDeleting} = useDeleteCategory()

  const handleDeleteCategoryConfirmation = async () => {
    try {
      // Send a delete request to the API
      deleteCategory(category);
      setDelCategory(false)
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete the product. Please try again.");
    }
  };
  return (
    <div>
      <button
        className="hover:scale-110 duration-300 hover:border-[#8ED06C] border-[#ffffff] border-b-[2px] transition underline-offset-2 decoration-[2px] inline-block hover:-translate-x-1" onClick={()=>setDelCategory(true)}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26 7.33398L25.1737 20.7008C24.9625 24.1159 24.8571 25.8235 24.0011 27.0512C23.5777 27.6581 23.0329 28.1704 22.4009 28.5553C21.1228 29.334 19.412 29.334 15.9903 29.334C12.5642 29.334 10.8511 29.334 9.57207 28.5539C8.93973 28.1683 8.39467 27.6551 7.97157 27.0471C7.11584 25.8175 7.0126 24.1075 6.80615 20.6876L6 7.33398"
            stroke="#8ED06C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 15.6465H20"
            stroke="#8ED06C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M14 20.873H18"
            stroke="#8ED06C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M4 7.33268H28M21.4073 7.33268L20.4972 5.45499C19.8925 4.2077 19.5901 3.58404 19.0687 3.1951C18.9531 3.10882 18.8305 3.03207 18.7024 2.96562C18.1249 2.66602 17.4319 2.66602 16.0457 2.66602C14.6248 2.66602 13.9144 2.66602 13.3273 2.97818C13.1972 3.04736 13.0731 3.12722 12.9561 3.21691C12.4286 3.62162 12.1339 4.26808 11.5446 5.56103L10.737 7.33268"
            stroke="#8ED06C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {delCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            <div>
              <h1 className="text-[16px] font-bold text-[#333333]">
                Are You Sure You Want To Delete This category ?
              </h1>
            </div>

            <div className="flex items-center justify-center gap-28">
              {/* Yes Button */}
              <button type="button" disabled={ isDeleting}  onClick={handleDeleteCategoryConfirmation}>
                <div className=" flex mt-10">
                  <h1 className="text-[#333333] flex font-bold gap-1 items-center hover:border-[#ffffff] hover:bg-[#E2E8F0] transition ease-out duration-500 border-[#004324] border-2 p-2 px-6 rounded-md">
                  {isDeleting? 'deleting..':'Yes'}
                  </h1>
                </div>
              </button>

              {/* No Button */}
              <button type="button" onClick={()=>setDelCategory(false)}>
                <div className=" flex mt-10">
                  <h1 className="text-[#ffffff] hover:text-[#333333] transition ease-out duration-700 flex font-bold gap-1 items-center border-[#004324] hover:bg-[#E2E8F0] bg-[#004324] border-2 p-2 px-6 rounded-md">
                   No
                  </h1>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteCategory