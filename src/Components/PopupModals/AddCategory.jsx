/* eslint-disable react/prop-types */
import { useState } from "react";
import { useCreateNewCategory } from "../../datahooks/products/productshooks";
import { BiLoaderCircle } from "react-icons/bi";
import { validateForm } from "../../utils/formatdate";
const AddCategory = ({isCategoryOpen, setCategoryOpen}) => {
  const store = JSON.parse(localStorage.getItem("store"));
  const { addCategoryToBackend, isAddingCategory } = useCreateNewCategory(() => {
    setCategoryOpen(false);
  });
 // Form fields state
  const [categoryDetails, setCategoryDetails] = useState({
    //i did this because i was getting an error of the inputs not being controlled at first(because they were undefined due to the empty object so do not change pls!)
   categoryName: "",  
    categoryDescription: ""
 })
  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setCategoryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const handleAddCategory = () => {
    const requiredFields = ["categoryName", "categoryDescription"];
    try {
      //if store doesn't exist return
      if (!store) return;
      //refactored validateForm
      if (!validateForm(requiredFields, categoryDetails)) return;
      //data to be sent and saved to backend
      addCategoryToBackend(categoryDetails);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
 
  return (
    <div className={`bg-[rgba(0,0,0,0.3)] fixed inset-0 z-20 backdrop-blur-sm ${isCategoryOpen?"visible":"invisible"}`}>
      <div className={`bg-white p-8  w-[90%] lg:w-[35%] rounded-tl-xl mx-auto fixed right-0 top-0 bottom-0 transform ${isCategoryOpen? "translate-x-0":"translate-x-full"} transition-all duration-200 ease-in`}>
        <button
          className="absolute top-4 left-4 text-green rounded-lg"
          onClick={() => setCategoryOpen(false)}
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

        <form action="" className="bg-white">
          <h2 className="text-[32px] border-b border-lightBlack my-6">Add Category</h2>
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
              onChange={handleCategoryChange}
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
              placeholder="input info about the category"
              value={categoryDetails.categoryDescription}
              className="border border-lightBlack rounded-lg  p-3 block w-full min-h-[200px]"
              onChange={handleCategoryChange}
              required
            ></textarea>
          </div>
          <button
            type="button"
            disabled={isAddingCategory}
            onClick={handleAddCategory}
            className="bg-green text-white mt-8 w-full font-semibold block mx-auto hover:bg-[#004315]  p-2 rounded-lg"
          >
            {isAddingCategory ? (
              <BiLoaderCircle className=" animate-spin duration-300 transition-all block mx-auto" />
            ) : (
              "Add Category"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
