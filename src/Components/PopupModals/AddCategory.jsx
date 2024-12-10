const AddCategory = ({setCategoryOpen}) => {
  return (
    <div className="bg-[rgba(0,0,0,0.35)] fixed inset-0">
      <div className="max-w-[450px] mx-auto relative">
        <button
          className="absolute top-4 right-4 text-lightGreen border border-lightGreen rounded-lg"
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

        <form action="" className="bg-white p-8 mt-32">
          <div className=" ">
            <label className="mb-2">Category Name</label>
            <input
              type="text"
              placeholder="Apparel"
              className="border border-lightGreen rounded-lg  p-3 block w-full"
              required
            />
          </div>
          <div className="mt-4">
            <label className="mb-2 ">
              Category Details{" "}
              <span className="text-[#6e6e6e] font-semibold" required>
                {" "}
                (Optional)
              </span>
            </label>
            <input
              type="text"
              placeholder="input info about the category  "
              className="border border-lightGreen rounded-lg  p-3 block w-full"
              required
            />
          </div>
          <button
            type="button"
            className="bg-green text-white mt-8 font-semibold block mx-auto w-[120px] p-2 rounded-lg"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
