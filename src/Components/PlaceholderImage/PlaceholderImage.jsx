import { placeholderImage } from "../../assets";
const ProfileImage = ({ profileImage }) => {
  const isStoreOwner = localStorage.getItem("storeOwnerRole"); 
  return (
    <>
      <img src={profileImage?profileImage:placeholderImage  } alt="profile picture" loading="lazy" className="w-8 h-8 rounded-full object-cover  " />
    </>
  );
};

export default ProfileImage;
 