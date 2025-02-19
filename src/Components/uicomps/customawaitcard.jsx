import Skeleton from "react-loading-skeleton";

/* eslint-disable react/prop-types */
const CustomAwaitCard = ({ children, isLoading, error,isCollapsed }) => {
  if (isLoading) {
    return (
      <div className={`mt-10 grid-cols-1 grid md:grid-cols-3 w-full gap-5 ${isCollapsed?'max-w-[1100px]':'max-w-[950px]'}`}>
        <Skeleton className="h-[200px]" />
        <Skeleton className=" h-[200px]" />
        <Skeleton className=" h-[200px]" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>{children}</div>;
};

export default CustomAwaitCard;
