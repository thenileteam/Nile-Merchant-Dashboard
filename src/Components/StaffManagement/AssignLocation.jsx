import { useAssignLocationStore } from "@/ZustandStores/locationStore";
import { addsquare } from "../../assets";
import { useFetchLocations } from "@/datahooks/location/useLocationhook";
import { FiChevronDown } from "react-icons/fi";

const AssignLocation = ({title,formType}) => {
    const { locations } = useFetchLocations();
    const {
        formStates,
        setSelectedLocation,
        setLocationAssigned,
      } = useAssignLocationStore();
    
      const { selectedLocation, isLocationAssigned } = formStates[formType];
  return (
    <>
      <div
        className="flex items-center justify-between bg-[#ffffff] border-lightBlack border p-3 rounded-md cursor-pointer my-3"
        onClick={() => setLocationAssigned(formType)}
      >
        <h1 className="text-gray-500 font-bold">
          {selectedLocation?.locationName || `Select location to add  ${title}`}
        </h1>
        <FiChevronDown className='text-[#6e6e6e]'/>
      </div>
      {isLocationAssigned && (
        <div className="absolute max-w-[380px] w-full border border-[#6e6e6e] bg-white rounded-md shadow-lg max-h-[200px] overflow-y-auto">
          {locations?.map((location) => (
            <div
              key={location.id}
              className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelectedLocation(formType,location)}
            >
              {location.locationName}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AssignLocation;
