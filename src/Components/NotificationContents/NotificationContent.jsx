import React from "react";
import { preference1 } from "../../assets";

const NotificationContent = () => {
  return (
    <div className="mt-40 ml-10">
      <div className="flex items-center justify-center gap-3 px-20 mt-10">
        {/* Filter section */}
        <div className="flex items-center gap-1">
          <h1 className="text-[#333333] font-bold text-[16px]">Filter By :</h1>
          <img src={preference1} alt="" />
        </div>
        <div className="flex items-center gap-2">
          <div>
            <h1 className="bg-[#8ED06C] p-2 w-fit rounded-md text-[#ffffff]">
              All
            </h1>
          </div>
          <div>
            <h1 className="bg-[#FFFFFF] p-2 w-fit rounded-md text-[#6E6E6E] font-bold">
              Today
            </h1>
          </div>
          <div>
            <h1 className="bg-[#FFFFFF] p-2 w-fit rounded-md text-[#6E6E6E] font-bold">
              This Month
            </h1>
          </div>
          <div>
            <h1 className="bg-[#FFFFFF] p-2 w-fit rounded-md text-[#6E6E6E] font-bold">
              This Year
            </h1>
          </div>
        </div>
      </div>

      {/* Notification Content */}
      <div className="flex items-center gap-7 mt-10">
        <div className="space-y-5">
          <h1 className="text-[#333333] text-[24px] font-bold">
            Unread Notification
          </h1>
          <div className="bg-[#EAF4E2] w-fit p-5 rounded-lg mt-7">
            <div className="flex gap-5">
              <h1 className="text-[#6E6E6E]">
                Lorem ipsum dolor sit amet consectetur. Nulla amet <br /> rutrum
                nulla lorem sit. Eu pharetra magna eget <br /> risus malesuada
                pretium tortor commodo <br /> consectetur. Elementum purus.
              </h1>
              <div>
                <p className="text-[#333333] font-bold text-center">9:41am</p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-2">
                  Mark As read
                </p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-2">
                  Delete
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#EAF4E2] w-fit p-5 rounded-lg">
            <div className="flex gap-5">
              <h1 className="text-[#6E6E6E]">
                Lorem ipsum dolor sit amet consectetur. Nulla amet <br /> rutrum
                nulla lorem sit. Eu pharetra magna eget <br /> risus malesuada
                pretium tortor commodo <br /> consectetur. Elementum purus.
              </h1>
              <div>
                <p className="text-[#333333] font-bold text-center">9:41am</p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-2">
                  Mark As read
                </p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-2">
                  Delete
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#EAF4E2] w-fit p-5 rounded-lg">
            <div className="flex gap-5">
              <h1 className="text-[#6E6E6E]">
                Lorem ipsum dolor sit amet consectetur. Nulla amet <br /> rutrum
                nulla lorem sit. Eu pharetra magna eget <br /> risus malesuada
                pretium tortor commodo <br /> consectetur. Elementum purus.
              </h1>
              <div>
                <p className="text-[#333333] font-bold text-center">9:41am</p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-2">
                  Mark As read
                </p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-2">
                  Delete
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#EAF4E2] w-fit p-5 rounded-lg">
            <div className="flex gap-5">
              <h1 className="text-[#6E6E6E]">
                Lorem ipsum dolor sit amet consectetur. Nulla amet <br /> rutrum
                nulla lorem sit. Eu pharetra magna eget <br /> risus malesuada
                pretium tortor commodo <br /> consectetur. Elementum purus.
              </h1>
              <div>
                <p className="text-[#333333] font-bold text-center">9:41am</p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-2">
                  Mark As read
                </p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-2">
                  Delete
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#EAF4E2] w-fit p-5 rounded-lg">
            <div className="flex gap-5">
              <h1 className="text-[#6E6E6E]">
                Lorem ipsum dolor sit amet consectetur. Nulla amet <br /> rutrum
                nulla lorem sit. Eu pharetra magna eget <br /> risus malesuada
                pretium tortor commodo <br /> consectetur. Elementum purus.
              </h1>
              <div>
                <p className="text-[#333333] font-bold text-center">9:41am</p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-2">
                  Mark As read
                </p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-2">
                  Delete
                </p>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div>
            <ol className="flex justify-center gap-3 text-xs font-medium mt-3">
              <li>
                <a
                  href="#"
                  className="inline-flex size-8 items-center justify-center rounded border border-gray-300 bg-white hover:bg-[#8ED06C] text-gray-900 hover:text-[#E2E8F0] rtl:rotate-180"
                >
                  <span className="sr-only">Prev Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-[#8ED06C] bg-white text-center leading-8 text-[#7E76BC]"
                >
                  1
                </a>
              </li>

              <li className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900">
                2
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900"
                >
                  ...
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900"
                >
                  9
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900"
                >
                  10
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-flex size-8 items-center justify-center rounded border border-gray-300 bg-white hover:bg-[#8ED06C] text-gray-900 hover:text-[#E2E8F0] rtl:rotate-180"
                >
                  <span className="sr-only">Next Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ol>
          </div>
        </div>

        {/* Notification Content */}
        <div className="space-y-5">
          <h1 className="text-[#333333] text-[24px] font-bold">
            Read Notification
          </h1>
          <div className="bg-[#FFFFFF] w-fit p-5 rounded-lg mt-7">
            <div className="flex gap-5">
              <h1 className="text-[#6E6E6E]">
                Lorem ipsum dolor sit amet consectetur. Nulla amet <br /> rutrum
                nulla lorem sit. Eu pharetra magna eget <br /> risus malesuada
                pretium tortor commodo <br /> consectetur. Elementum purus.
              </h1>
              <div>
                <p className="text-[#333333] font-bold text-center mt-6">
                  9:41am
                </p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-1">
                  Delete
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#FFFFFF] w-fit p-5 rounded-lg">
            <div className="flex gap-5">
              <h1 className="text-[#6E6E6E]">
                Lorem ipsum dolor sit amet consectetur. Nulla amet <br /> rutrum
                nulla lorem sit. Eu pharetra magna eget <br /> risus malesuada
                pretium tortor commodo <br /> consectetur. Elementum purus.
              </h1>
              <div>
                <p className="text-[#333333] font-bold text-center mt-6">
                  9:41am
                </p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-1">
                  Delete
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#FFFFFF] w-fit p-5 rounded-lg">
            <div className="flex gap-5">
              <h1 className="text-[#6E6E6E]">
                Lorem ipsum dolor sit amet consectetur. Nulla amet <br /> rutrum
                nulla lorem sit. Eu pharetra magna eget <br /> risus malesuada
                pretium tortor commodo <br /> consectetur. Elementum purus.
              </h1>
              <div>
                <p className="text-[#333333] font-bold text-center mt-6">
                  9:41am
                </p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-1">
                  Delete
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#FFFFFF] w-fit p-5 rounded-lg">
            <div className="flex gap-5">
              <h1 className="text-[#6E6E6E]">
                Lorem ipsum dolor sit amet consectetur. Nulla amet <br /> rutrum
                nulla lorem sit. Eu pharetra magna eget <br /> risus malesuada
                pretium tortor commodo <br /> consectetur. Elementum purus.
              </h1>
              <div>
                <p className="text-[#333333] font-bold text-center mt-6">
                  9:41am
                </p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-1">
                  Delete
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[#FFFFFF] w-fit p-5 rounded-lg">
            <div className="flex gap-5">
              <h1 className="text-[#6E6E6E]">
                Lorem ipsum dolor sit amet consectetur. Nulla amet <br /> rutrum
                nulla lorem sit. Eu pharetra magna eget <br /> risus malesuada
                pretium tortor commodo <br /> consectetur. Elementum purus.
              </h1>
              <div>
                <p className="text-[#333333] font-bold text-center mt-6">
                  9:41am
                </p>
                <p className="text-[#8ED06C] font-extrabold text-center mt-1">
                  Delete
                </p>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div>
            <ol className="flex justify-center gap-3 text-xs font-medium mt-3">
              <li>
                <a
                  href="#"
                  className="inline-flex size-8 items-center justify-center rounded border border-gray-300 bg-white hover:bg-[#8ED06C] text-gray-900 hover:text-[#E2E8F0] rtl:rotate-180"
                >
                  <span className="sr-only">Prev Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-[#8ED06C] bg-white text-center leading-8 text-[#7E76BC]"
                >
                  1
                </a>
              </li>

              <li className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900">
                2
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900"
                >
                  ...
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900"
                >
                  9
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900"
                >
                  10
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-flex size-8 items-center justify-center rounded border border-gray-300 bg-white hover:bg-[#8ED06C] text-gray-900 hover:text-[#E2E8F0] rtl:rotate-180"
                >
                  <span className="sr-only">Next Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationContent;
