import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { delete1, delete2 } from '../../assets';

const DeleteAccount = () => {
  const navigate = useNavigate();

  // State to control the main popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // State to control the final confirmation visibility
  const [isFinalConfirmationOpen, setIsFinalConfirmationOpen] = useState(false);
  
  // State to control whether the fade-out animation should play
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Function to toggle the main popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Function to handle the "Yes" button click
  const handleYesClick = () => {
    setIsPopupOpen(false); // Close the main popup
    setIsFinalConfirmationOpen(true); // Show the final confirmation popup

    // Automatically start the fade-out after a short delay
    setTimeout(() => {
      setIsFadingOut(true); // Trigger fade-out animation
    }, 2500); // Show the final confirmation for 2.5 seconds before fading out

    // Close the final confirmation popup and redirect to login page
    setTimeout(() => {
      setIsFinalConfirmationOpen(false); // Fully close the popup
      setIsFadingOut(false); // Reset fade state
      navigate('/'); // Redirect to login page
    }, 1500); // Total time = 2.5 seconds + 0.5 seconds for fade-out
  };

  return (
    <>
      {/* Button to trigger the popup */}
      <button onClick={togglePopup}>
        <div className='flex items-center justify-between bg-[#EAF4E2] border-[#8ED06C] border-2 rounded-md w-[322.89px] h-[160px] p-3'>
          <div>
            <img src={delete1} alt="" />
            <div className='mt-5'>
              <h1 className='text-[#333333] font-bold'>Delete Your Account</h1>
            </div>
          </div>
        </div>
      </button>

      {/* Main Popup Modal */}
      {isPopupOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-[300px] relative">
            <div>
              <h1 className='text-[16px] font-bold text-[#333333] text-center'>
                Are You Sure You Want <br /> To Delete Your Account?
              </h1>
            </div>

            <div className="flex items-center justify-center gap-16">
              {/* Yes Button */}
              <button onClick={handleYesClick} type="button">
                <div className='flex mt-10'>
                  <h1 className='text-[#333333] flex font-bold gap-1 items-center hover:border-[#ffffff] hover:bg-[#E2E8F0] transition ease-out duration-500 border-[#004324] border-2 p-2 px-6 rounded-md'>
                    Yes
                  </h1>
                </div>
              </button>

              {/* No Button */}
              <button onClick={togglePopup} type="button">
                <div className='flex mt-10'>
                  <h1 className='text-[#ffffff] hover:text-[#333333] transition ease-out duration-700 flex font-bold gap-1 items-center border-[#004324] hover:bg-[#E2E8F0] bg-[#004324] border-2 p-2 px-6 rounded-md'>
                    No
                  </h1>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final Confirmation Modal with Fade-Out Animation */}
      {isFinalConfirmationOpen && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 
          ${isFadingOut ? 'opacity-0 transition-opacity duration-500' : 'opacity-100 transition-opacity duration-500'}`}>
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-[207px] w-full relative">
            <div>
              <h1 className='text-[16px] font-bold text-[#333333] text-center'>Account Deleted.
              But We’re Not Happy You’re Leaving</h1>
            </div>
            <div className='flex justify-center mt-5'>
              <img src={delete2} alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccount;