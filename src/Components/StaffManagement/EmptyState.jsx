const EmptyState = ({ 
    title, 
    description, 
    buttonText, 
    showPopUp, 
    setShowPopUp, 
  PopUpComponent ,
    icon:Icon
  }) => {
    return (
      <div className="flex justify-center items-center max-w-[400px] mx-auto h-screen">
        <div className="text-center">
          <Icon/>
          <h3 className="capitalize text-lightBlack font-semibold">{title}</h3>
          <strong className="text-lightBlack">{description}</strong>
          <button 
            className="bg-green text-white py-1 px-2 rounded-md mt-3 block mx-auto" 
            onClick={() => setShowPopUp(true)}
          >
            {buttonText}
          </button>
          {showPopUp && PopUpComponent && <PopUpComponent setShowPopUp={setShowPopUp} />}
        </div>
      </div>
    );
  };
  
  export default EmptyState;
  