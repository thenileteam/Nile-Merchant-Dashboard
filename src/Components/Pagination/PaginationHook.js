// usePagination.js
import { useState } from "react";

const usePagination = (data, itemsPerPage) => {
console.log(Array.isArray(data))
    const [currentPage, setCurrentPage] = useState(0);
  // divide the data's length by the items per page for the page count
  const pageCount = Math.ceil(data?.length / itemsPerPage);
  // data to only show items for the current page
  const currentItems = data?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return {currentPage, pageCount, currentItems, handlePageChange };
};

export default usePagination;
