import { FiSearch } from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useRef } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {parseISO } from "date-fns";
const PageFilters = ({
  filters,
  activeFilter,
  onFilterChange,
  searchPlaceholder,
  handleSearch,
  selectedDate,
handleDateFilter,
  page,
}) => {
  return (
    <div className="flex  flex-col lg:flex-row justify-between mt-8 mb-4 gap-4 lg:gap-0">
      <div className="lg:flex lg:items-center space-x-4 border rounded-xl  ">
        {/* Filter Buttons */}
        {filters.map((filter, index) => (
          <button
            key={filter}
            className={`px-4 py-1 rounded-xl ${
              activeFilter === filter
                ? "bg-[#EAF4E2] text-green"
                : "bg-transparent text-gray-600"
            }`}
            onClick={() => onFilterChange(filter)}
          >
            {index === 0 ? `${filter} ${page}` : filter}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="border px-4 py-2 rounded-3xl w-full lg:w-fit pl-8"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <FiSearch className="absolute top-3 left-3" />
      </div>
      <div className="hidden lg:block relative text-lightGreen lg:w-[150px]">
      <DatePicker
          selected= {selectedDate ? parseISO(selectedDate) : null} 
          onChange={ handleDateFilter}
          placeholderText="Select Date"
          className="w-full border rounded-md pl-8 py-2 cursor-pointer font-semibold placeholder:text-lightGreen"
          dateFormat="yyyy-MM-dd"
          showPopperArrow={false}
          popperClassName="!z-[1000]"
        />
        <FaRegCalendarAlt className="absolute left-3 top-3" />
      </div>
    </div>
  );
};

export default PageFilters;
