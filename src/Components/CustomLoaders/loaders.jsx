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

     if (data.length === 0)
       return (
         <div className="flex justify-center bg-white mt-5 items-center h-[200px]">
           No records found
         </div>
       );
  return children;
};
