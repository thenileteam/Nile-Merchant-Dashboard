import Skeleton from "react-loading-skeleton";

/* eslint-disable react/prop-types */
const CustomAwaitCard = ({ children, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className=" mt-10 justify-between  grid-cols-1 grid md:grid-cols-3 w-full min-w-48">
        <Skeleton className=" w-[400px] h-[200px]" />
        <Skeleton className=" w-[400px] h-[200px]" />
        <Skeleton className=" w-[400px] h-[200px]" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>{children}</div>;
};

export default CustomAwaitCard;
