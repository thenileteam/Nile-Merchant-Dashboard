import { placeholderImage } from "../../assets";
import { useStore } from "../../ZustandStores/generalStore";
const ProfileImage = ({ profileImage }) => {
  const isStoreOwner = localStorage.getItem("storeOwnerRole"); 
  const { staff } = useStore()
  return (
    <>
      {isStoreOwner ? <img src={profileImage ? profileImage : placeholderImage} alt="profile picture" loading="lazy" className="w-8 h-8 rounded-full object-cover  " /> :
        <div className="w-9 h-9 rounded-full bg-lightGreen text-white font-semibold flex justify-center items-center tracking-wide">{staff?.name[0].toUpperCase() + staff?.name[1].toUpperCase()|| 'Staff'}</div>
      }
    </>
  );
};

export default ProfileImage;
 