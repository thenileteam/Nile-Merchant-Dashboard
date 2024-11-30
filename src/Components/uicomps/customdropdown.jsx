/* eslint-disable react/prop-types */
import { useState } from "react";

const CustomDropdown = ({ paymentStatus, setPaymentStatus }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const options = [
    { value: "", label: "Choose Payment Status", color: "text-zinc-600" },
    { value: "PAID", label: "Paid", color: "text-[#34C759]" },
    { value: "UNPAID", label: "Unpaid", color: "text-[#DC3545]" },
    {
      value: "PARTIALLY_FAILED",
      label: "Partially Paid",
      color: "text-[#FFCC00]",
    },
  ];

  const handleSelect = (value) => {
    setPaymentStatus(value);
  };
  return (
    <div className="relative">
      <button
        onClick={() => {
          if (modalOpen) {
            setModalOpen(false);
            return;
          }
          setModalOpen(true);
        }}
        className="w-full h-[50px] px-4 text-left   rounded-lg appearance-none"
      >
        {options.find((opt) => opt.value === paymentStatus)?.label ||
          "Choose Payment Status"}
      </button>
      {modalOpen && (
        <ul className="absolute z-[4000000] top-full w-fit bg-white border border-gray-300 rounded-lg">
          {options.map((option) => (
            <li
              onClick={() => {
                handleSelect(option.value);

                setModalOpen(false);
              }}
              key={option.value}
              className={`py-2 text-nowrap px-4 w-full  cursor-pointer ${option.color} hover:bg-gray-100`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
