import Skeleton from "react-loading-skeleton";

/* eslint-disable react/prop-types */
const CustomAwaitTable = ({ children, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className=" mt-10 flex flex-col gap-5 w-full min-w-48">
        <Skeleton className=" w-full h-[60px]" />
        <Skeleton className=" w-full h-[60px]" />
        <Skeleton className=" w-full h-[60px]" />
        <Skeleton className=" w-full h-[60px]" />
        <Skeleton className=" w-full h-[60px]" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>{children}</div>;
};

export default CustomAwaitTable;
