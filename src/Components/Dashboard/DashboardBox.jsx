import { format } from 'date-fns';
const DashboardBox = ({ spacing, image, data, text, width, imgWidth, naira }) => {
  const today = new Date()

  
  return (
    <div
      className={`bg-[#FFFCFC] border-2 shadow-sm ${width} max-w-[273px] p-4 rounded-md flex gap-2 items-center`}
    >
      {/* <img src={image} className={imgWidth} alt={`icon ${text} `} /> */}
      <div>
        <p className="text-[#6E6E6E] font-semibold">{text}</p>
        <h1 className={`text-[#0A9B21] text-[22px] font-semibold  ${spacing}`}><span>{naira}</span>{data}</h1>
        {/* &#8593; */}
        <p className="font-extralight text-[#333]"> 
          Today:
         <span className=" text-[#0A9B21] text-sm"> {format(today, 'dd/MM/yyyy')} </span>
        
        </p>
        
      </div>
    </div>
  );
};

export default DashboardBox;
