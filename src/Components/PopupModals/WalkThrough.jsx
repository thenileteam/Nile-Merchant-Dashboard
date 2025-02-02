import React, { useState } from "react";
import { idea } from "../../assets";
import Joyride from "react-joyride";

const tourSteps = [
  {
    target: "#order", // The class name of the element you want to highlight
    content: "View your in-store orders easily or create offline ones manually",
    placement: "right", // position of the popup to the highlighted element
    styles: {
      options: {
        textColor: "#8ED06C",
      },
    },
  },
  {
    target: "#product",
    content: "Add products, edit it and restock your inventory.",
    placement: "right",
    styles: {
      options: {
        textColor: "#fff",
        backgroundColor: "#8ED06C",
      },
    },
  },
  {
    target: "#customer",
    content:
      "Reach out to your customers, see when last they buy from you.Add customers manually too.",
    placement: "right",
    styles: {
      options: {
        textColor: "#fff",
        backgroundColor: "#8ED06C",
      },
    },
  },
  {
    target: "#settings",
    content:
      "Do more with your store by personalizing it; from staff management, store customization, multi-location and lots more..",
    placement: "right",
    styles: {
      options: {
        textColor: "#8ED06C",
      },
    },
  },
];

const Walkthrough = () => {
  const [runTour, setRunTour] = useState(false); // Start the tour only when the walkthrough button is clicked

  return (
    <div className="relative">
      {/* Walkthrough Button */}
      <button
        onClick={() => setRunTour(true)}
        className="flex items-center gap-1 p-2 w-full hover:bg-zinc-100 transitions"
      >
        <img src={idea} className="w-5" alt="light bulb" />
        <span>Walkthrough</span>
      </button>
      {/* React Joyride */}
      <Joyride
        steps={tourSteps}
        run={runTour}
        continuous={true} // Continue to the next step automatically
        // disableBeacon={true}
        beaconComponent={null}
        showProgress={false} // Show progress as you go through the steps
        showSkipButton={true} /// skip the tour
        callback={(data) => {
          if (data.status === "finished" || data.status === "skipped") {
            setRunTour(false); // Stop the tour when it's finished or skipped
          }
        }}
        styles={{
          options: {
            width: "228px",
             arrowColor: 'transparent'
          },
          
          buttonNext: {
            backgroundColor: "#004324",
            color: "#fff",
          },
          buttonBack: {
            color: "#fff",
            border: "1px solid #fff",
            borderRadius:'4px'
          },

          buttonClose: {
            color: "#333",
            border: "2px solid #fff",
            borderRadius: "8px",
            width: "10px",
            padding: "5px",
          },
        }}
      />
    </div>
  );
};

export default Walkthrough;
