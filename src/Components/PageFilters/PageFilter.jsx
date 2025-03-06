import { FiSearch } from "react-icons/fi";

const PageFilters = ({
  filters,
  activeFilter,
  onFilterChange,
  searchPlaceholder,
  handleSearch,
  page,
}) => {
  return (
    <div className="flex justify-between mt-8 mb-4">
      <div className="lg:flex lg:items-center space-x-4 border rounded-xl hidden ">
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
    </div>
  );
};

export default PageFilters;
