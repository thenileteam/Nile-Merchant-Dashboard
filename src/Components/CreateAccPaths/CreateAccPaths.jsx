import { Link } from "react-router-dom";
const CreateAccPaths = ({ text, path,linkText }) => {
  return (
    <div className="mt-8 flex items-center gap-1 justify-center">
      <p className="text-center text-[#000000] font-bold">
        {" "}
        {text}{" "}
        <Link to={path} className="text-lightGreen font-semibold">
          {linkText}
        </Link>{" "}
      </p>
    </div>
  );
};

export default CreateAccPaths;
