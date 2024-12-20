import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <div>
      {/* React Paginate Component */}
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <span className="inline-flex size-8 items-center justify-center rounded border border-gray-300 bg-white hover:bg-[#8ED06C] text-gray-900 hover:text-[#E2E8F0]">
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
          </span>
        }
        previousLabel={
          <span className="inline-flex size-8 items-center justify-center rounded border border-gray-300 bg-white hover:bg-[#8ED06C] text-gray-900 hover:text-[#E2E8F0]">
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
          </span>
        }
        onPageChange={onPageChange}
        pageCount={pageCount}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        containerClassName="flex justify-center gap-3 text-xs font-medium mt-3"
        pageClassName="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900"
        activeClassName="border-[#8ED06C] text-[#8ED06C]"
        breakClassName="block size-8 rounded border border-gray-300 bg-white text-center leading-8 text-gray-900"
        nextClassName="inline-flex size-8 items-center justify-center"
        previousClassName="inline-flex size-8 items-center justify-center"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default Pagination;
