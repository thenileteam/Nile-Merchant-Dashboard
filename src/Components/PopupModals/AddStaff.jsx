
const AddStaff = ({setShowStaffPopUp}) => {
    
  return (
    <div className="bg-[rgba(0,0,0,0.35)] fixed inset-0 overflow-y-scroll">
      <div className="max-w-[450px] mx-auto relative">
        <button className="absolute top-4 right-4 text-lightGreen border border-lightGreen rounded-md" onClick={()=>setShowStaffPopUp(false)}>
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

        <form action="" className="bg-white p-8 mt-32  ">
          <div className="mt-4 ">
            <label htmlFor="adminName" className="mb-2 text-lightBlack font-bold">
              Admin Name
            </label>
            <input
              type="text"
              name="adminName"
              placeholder="Enter Admin Name e.g Farouk kola"
              className="border border-lightGreen rounded-md  p-2 block w-full"
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="staffMail" className="mb-2 text-lightBlack font-bold">
              Email
            </label>
            <input
              type="email"
              name="staffMail"
              placeholder="e.g farouk@gmail.com "
              className="border border-lightGreen rounded-md  p-2 block w-full"
              required
            />
          </div>
          <div className="mt-2">
            <label htmlFor="StaffNumber" className="mb-2 text-lightBlack font-bold">
              Phone Number
            </label>
            <input
              type="text"
              name="staffNumber"
              placeholder="input  staff number "
              className="border border-lightGreen rounded-md  p-2 block w-full"
              required
            />
          </div>{" "}
          <div className="mt-2">
            <label htmlFor="adminPWord" className="mb-2 text-lightBlack font-bold">
              Admin Password
            </label>
            <input
              type="password"
              name="adminPWord"
              placeholder="input password admin will use to login"
              className="border border-lightGreen rounded-md  p-2 block w-full"
              required
            />
          </div>
          {/* permission check boxes */}
          <div>
            <h3 className="text-green font-bold mt-2">Permissions</h3>
            <p className="mb-2 text-[#6e6e6e] text-[12px]">Choose What The Admin Should Be Able To Access:</p>
            <div className="border border-lightGreen rounded-md flex mt-2 justify-between items-center px-2">
              <div>
                <h3 className="text-gray-800 font-semibold text-sm ">
                  Orders & Shipping
                </h3>
                <p className="text-gray-500 text-[12px]">
                  Will be able to perform action on this page
                </p>
              </div>
              <label htmlFor="order-permission">
                <input type="checkbox" id="order-permission" />
              </label>
            </div>
            <div className="border border-lightGreen rounded-md flex mt-2 justify-between items-center px-2">
              <div>
                <h3 className="text-gray-800 font-semibold text-sm ">
                  Products
                </h3>
                <p className="text-gray-500 text-[12px]">
                Will be able to perform action on this page
                </p>
              </div>
              <label htmlFor="product-permission">
                <input type="checkbox" id="product-permission" />
              </label>
            </div>
            <div className="border border-lightGreen rounded-md flex mt-2 justify-between items-center px-2">
              <div>
                <h3 className="text-gray-800 font-semibold text-sm ">
                  Customer Management
                </h3>
                <p className="text-gray-500 text-[12px]">
                  Will be able to perform action on this page
                </p>
              </div>
              <label htmlFor="customer-permission">
                <input type="checkbox" id="customer-permission" />
              </label>
            </div>
            <div className="border border-lightGreen rounded-md flex mt-2 justify-between items-center px-2">
              <div>
                <h3 className="text-gray-800 font-semibold text-sm ">
                  Financial Management
                </h3>
                <p className="text-gray-500 text-[12px]">
                  Will be able to perform action on this page
                </p>
              </div>
              <label htmlFor="financial-permission">
                <input type="checkbox" id="financial-permission" />
              </label>
            </div>
          </div>
          <button
            type="button"
            // disabled={isAddingCategory}
            // onClick={handleAddCategory}
            className="bg-green text-white mt-8 font-semibold block mx-auto w-[150px] p-2 rounded-md"
          >
            {/* {isAddingCategory ? (
              <BiLoaderCircle className=" animate-spin duration-300 transition-all block mx-auto" />
            ) : (
              "Add Category"
            )} */}
            Send An Invite
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;
