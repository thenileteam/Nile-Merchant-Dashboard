const DashboardBox = ({ bgColor, image, data, text, width, imgWidth, naira }) => {
  return (
    <div
      className={`${bgColor} border-2 shadow-sm ${width} max-w-[273px] p-5 rounded-md flex gap-2 items-center`}
    >
      
      <img src={image} className={imgWidth} alt={`icon ${text} `} />
      <div>
        <h1 className="text-[#333333] text-[22px] font-bold mt-1"><span>{ naira}</span>{data}</h1>
        <p className="text-[#6E6E6E]">{text}</p>
      </div>
    </div>
  );
};

export default DashboardBox;
