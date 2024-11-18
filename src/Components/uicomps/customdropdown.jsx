import { useState } from "react";

const CustomDropdown = () => {
  const [selected, setSelected] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const options = [
    { value: "", label: "Choose Payment Status", color: "text-zinc-600" },
    { value: "Paid", label: "Paid", color: "text-[#34C759]" },
    { value: "Unpaid", label: "Unpaid", color: "text-[#DC3545]" },
    {
      value: "Partially Paid",
      label: "Partially Paid",
      color: "text-[#FFCC00]",
    },
  ];

  const handleSelect = (value) => {
    setSelected(value);
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
        {options.find((opt) => opt.value === selected)?.label ||
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
