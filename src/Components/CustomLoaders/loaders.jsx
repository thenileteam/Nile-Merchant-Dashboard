/* eslint-disable react/prop-types */
export const UserTableListLoader = ({
  data,
  children,
  loading,
  error,
  cols,
}) => {
  console.log(data, loading, error, cols);
  if (loading)
    return (
      <div className=" flex mt-5 bg-white flex-col">
        {[0, 1, 2].map((_, index) => (
          <div
            key={index}
            className={` w-full flex space-x-10 justify-between   p-2 rounded-md`}
          >
            {Array.from({ length: cols }).map((_, index) => (
              <td
                key={index}
                className="h-3  w-full  px-2 py-1 bg-gray-200 rounded-md animate-pulse"
              ></td>
            ))}
          </div>
        ))}
      </div>
    );
  if (error)
    return (
      <div className="flex bg-white mt-5 justify-center items-center h-[200px]">
        {/* <img src={error} alt="" /> */}
        An error occurred
      </div>
    );

  if (data?.length === 0)
    return (
      <div className="flex justify-center bg-white mt-5 items-center h-[200px]">
        No records found
      </div>
    );
  return children;
};

/* eslint-disable react/prop-types */
export const UseCardLoader = ({ children, loading, error, className,amount}) => {
  if (loading)
    return (
      <div className={`w-full bg-transparent mb-5 grid grid-cols-4 gap-10 ${className}`}>
        {Array.from({length: amount}).map((_, index) => (
          <div
            key={index}
            className={`min-w-[210px] h-[180px]  animate-pulse bg-gray-200 flex justify-between p-2 rounded-md`}
          ></div>
        ))}
      </div>
    );
  if (error)
    return (
      <div className="flex bg-white mt-5 justify-center items-center h-[200px]">
        {/* <img src={error} alt="" /> */}
        An error occurred
      </div>
    );

  return children;
};
