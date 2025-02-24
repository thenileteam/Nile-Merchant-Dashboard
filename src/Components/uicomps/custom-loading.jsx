/* eslint-disable react/prop-types */
export const CustomLoading = ({ children, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center mx-auto min-h-80 w-full items-center">
        <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) {
    return <div>There was an error loading this data</div>;
  }

  return children;
};
