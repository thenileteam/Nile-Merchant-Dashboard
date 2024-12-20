const DashboardBox = ({ bgColor, image, data, text, width }) => {
  return (
    <div
      className={`${bgColor} border-2 shadow-sm ${width} max-w-[273px] p-5 rounded-md`}
    >
      <img src={image} alt={`icon ${text}`} />
      <h1 className="text-[#333333] text-[22px] font-bold mt-1">{data}</h1>
      <p className="text-[#6E6E6E]">{text}</p>
    </div>
  );
};

export default DashboardBox;
