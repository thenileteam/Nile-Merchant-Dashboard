import { useState } from "react";

const ReviewText = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-center">
        {/* View button */}
        <td
          className="px-2 py-3 text-center text-[#8ED06C] cursor-pointer"
          onClick={handleOpenModal}
        >
          View
        </td>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-96 p-6 rounded-md relative">
            {/* Cancel button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-[black] text-2xl"
              onClick={handleCloseModal}
            >
              &times;
            </button>

            {/* Modal content */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Jacob</h2>
              <div className="border-2 border-[#333333] p-2 rounded-md">
                <p className="text-[#6E6E6E]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio reiciendis neque, sit libero ab ipsum dolor expedita eligendi sint nesciunt molestiae vitae dolore soluta veritatis minima animi repudiandae placeat assumenda ullam voluptatem aliquam incidunt? Officiis nulla unde reprehenderit repellendus, excepturi accusantium perferendis et tempore laborum fugiat at, praesentium, modi necessitatibus?</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewText;
