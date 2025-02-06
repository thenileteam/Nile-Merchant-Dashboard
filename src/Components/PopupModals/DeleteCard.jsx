import { useDeleteCard } from "../../datahooks/billinghooks/useBillinghook";
import { useCardStore } from "@/ZustandStores/generalStore";
const DeleteCard = ({ card,}) => {
    const { openDelCard, delCard, closeDelCard , toggleDelCard} = useCardStore() ;
    const { deleteCard, isDeletingCard } = useDeleteCard(()=>{
      closeDelCard()
    });
  const handleDeleteCard = () => {
    try {
      //delete Card chosen
      deleteCard(card);
    } catch (error) {
      console.error(`error.. ${error}`);
    }
  };
  return (
    <>
        <button
          type="button"
          className={`bg-transparent float-right underline text-[#DC3545] font-semibold`}
          onClick={openDelCard}
        >
          Delete card
        </button>
      {delCard&&<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full relative max-w-[250px]">
          <button
            className="text-md text-lightGreen rounded-sm absolute top-2 right-3"
            onClick={closeDelCard}
          >
            x
          </button>
          <h3 className="my-2">Are you sure you want to delete this card?</h3>
          <div className="font-medium flex justify-center gap-4 align-center">
            <button
              className="border border-lightGreen p-1 text-lightGreen rounded-sm w-[70px]"
              onClick={handleDeleteCard}
            >
              {isDeletingCard ? "Del.." : "Yes"}
            </button>
            <button
              className="text-white bg-green rounded-sm w-[70px] hover:bg-transparent hover:text-lightGreen hover:border border-lightGreen transitions"
              onClick={closeDelCard}
            >
              No
            </button>
          </div>
        </div>
      </div>}
    </>
  );
};

export default DeleteCard;
