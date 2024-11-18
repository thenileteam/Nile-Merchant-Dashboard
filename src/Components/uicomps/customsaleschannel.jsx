import { useState } from "react";

const CustomSalesChannelDropdown = () => {
  const [selected, setSelected] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const options = [
    { value: "", label: "Choose Sales Channel", color: "text-[#6E6E6E]" },
    { value: "Physical-Shop", label: "Physical Shop", color: "text-[#6E6E6E]" },
    { value: "Social-Media", label: "Social Media", color: "text-[#6E6E6E]" },
    {
      value: "Others",
      label: "Others",
      color: "text-[#6E6E6E]",
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
        className="w-full h-[50px] px-4  text-left   rounded-lg appearance-none"
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

export default CustomSalesChannelDropdown;
