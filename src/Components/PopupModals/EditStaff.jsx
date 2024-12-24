import { totalRevenue } from '@/assets';
import {useState} from 'react'
const EditStaff = () => {
  const [editStaff, setEditStaff] = useState(false)
  return (
    <div>
      <button className="hover:scale-110 duration-300 hover:border-[#8ED06C] border-[#ffffff] border-b-[2px] transition underline-offset-2 decoration-[2px] inline-block hover:-translate-x-1" onClick={() => setEditStaff(!editStaff)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591"
            stroke="#8ED06C"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3"
            stroke="#8ED06C"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* edit staff parent */}
     { editStaff &&<div className="bg-[rgba(0,0,0,0.4)] fixed inset-0">
        <div className="max-w-[450px] mx-auto relative">
        <button
          className="absolute top-4 right-4 text-lightGreen border border-lightGreen rounded-lg"
          onClick={() => setEditStaff(false)}
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
          {/* edit form component */}
          <form action="" className="bg-white p-8 mt-32">
            <div className="mt-4 ">
              <label
                htmlFor="adminName"
                className="mb-2 text-lightBlack font-bold"
              >
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
            <h4 className="text-green font-bold">Last Login: <span className='text-lightBlack'>date</span></h4>
            <div>
              <h3 className="text-green font-bold mt-2">Permissions</h3>
              <p className="mb-2 text-[#6e6e6e] text-[12px]">
                Choose What The Admin Should Be Able To Access:
              </p>
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
          </form>
        </div>
      </div>}
    </div>
  );
};

export default EditStaff;
