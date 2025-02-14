const DashboardIntro = ({ introText, overview }) => {
  return (
      <div>
        <h1 className="font-bold text-[32px] text-lightBlack"> {introText}</h1>
        <p className="font-light text-lg text-[#1D2823] pt-[2px]">
          {" "}
          {overview}
        </p>
      </div>
  );
};

export default DashboardIntro;
