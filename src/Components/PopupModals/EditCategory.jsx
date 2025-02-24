import { useState } from "react";
import { useEditCategory } from "../../datahooks/products/productshooks";
import { BiLoaderCircle } from "react-icons/bi";
const EditCategory = ({ category }) => {
  const [showForm, setShowForm] = useState(false);
  const [categoryDetails, setCategoryDetails] = useState({
    categoryName: category.name || "",
    categoryDescription: category.description || "",
  });

  const { addCategoryToBackend, isEditingCategory } = useEditCategory();
  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission to edit a category
  const handleEditCategory = () => {
    try {
      const updatedCategory = {
        categoryName: categoryDetails.categoryName,
        categoryDescription: categoryDetails.categoryDescription,
        id: category.id,
      };
      addCategoryToBackend(updatedCategory);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {/* Button to trigger the popup */}
      <button
        className="hover:scale-110 duration-300 hover:border-lightBlack border-[#ffffff] border-b-[2px] transition underline-offset-2 decoration-[2px] inline-block hover:-translate-x-1"
        onClick={() => setShowForm(true)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591"
            stroke="#6e6e6e"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3"
            stroke="#6e6e6e"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* form to edit category */}
        <div className={`bg-[rgba(0,0,0,0.4)] fixed inset-0 z-50 backdrop-blur-sm ${showForm?'visible':'invisible'}`}>
          <div className={`w-[90%] lg:w-[35%]  rounded-tl-xl fixed right-0 bottom-0 top-0 bg-white  ${showForm? "translate-x-0":"translate-x-full"} transition-all duration-200 ease-in`}>
            <button
              className="absolute top-4 left-4 text-green rounded-lg"
              onClick={() => setShowForm(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <form className="p-8 ">
              <h2 className='text-[32px] text-lightBlack font-bold border-b border-lightBlack my-6'>Edit Category</h2>
              <div className=" ">
                <label htmlFor="categoryName" className="mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  name="categoryName"
                  value={categoryDetails.categoryName}
                  placeholder="Apparel"
                  className="border border-lightBlack rounded-lg  p-3 block w-full"
                  onChange={handleCategoryInputChange}
                  required
                />
              </div>
              <div className="mt-4">
                <label htmlFor="productDescription" className="mb-2 ">
                  Category Details{" "}
                  <span className="text-[#6e6e6e] font-semibold" required>
                    {" "}
                    (Optional)
                  </span>
                </label>
                <textarea
                  type="text"
                  name="categoryDescription"
                  placeholder="input info about the category  "
                  value={categoryDetails.categoryDescription}
                  className="border border-lightBlack rounded-lg  p-3 block w-full"
                  onChange={handleCategoryInputChange}
                  required
                ></textarea>
              </div>
              <button
                type="button"
                disabled={isEditingCategory}
                onClick={handleEditCategory}
                className="bg-green text-white mt-8 font-semibold block mx-auto  p-2 rounded-lg w-full hover:bg-[#004315]"
              >
                {isEditingCategory ? (
                  <BiLoaderCircle className=" animate-spin duration-300 transition-all block mx-auto" />
                ) : (
                  "Edit Category"
                )}
              </button>
            </form>
          </div>
        </div>
      {/* )} */}
    </>
  );
};

export default EditCategory;
