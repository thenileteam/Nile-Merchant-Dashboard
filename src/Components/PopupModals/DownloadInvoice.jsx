import { useState, useEffect } from "react";

const DownloadInvoice = () => {
  const [isDownloading, setIsDownloading] = useState(false); // Controls progress bar visibility
  const [progress, setProgress] = useState(0); // Progress value
  const [isConfirmed, setIsConfirmed] = useState(false); // Controls confirmation popup visibility

  // Function to start the download process
  const handleDownloadClick = () => {
    setIsDownloading(true);
    setProgress(0); // Reset progress
    let progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        } else {
          clearInterval(progressInterval);
          setIsDownloading(false); // Hide progress bar
          setIsConfirmed(true); // Show confirmation popup
          return 100;
        }
      });
    }, 300); // Adjust speed of progress bar (300ms for each step)
  };

  // Automatically hide confirmation popup after a delay
  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        setIsConfirmed(false);
      }, 500); // 3 seconds delay before disappearing
      return () => clearTimeout(timer);
    }
  }, [isConfirmed]);

  return (
    <div>
      {/* Download PDF link */}
      <p className="cursor-pointer" onClick={handleDownloadClick}>
        Download Invoice
      </p>

      {/* Progress Bar Popup */}
      {isDownloading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-[#333333]">
              Downloading
            </h2>
            <div className="w-full bg-gray-200 rounded-sm h-4">
              <div
                className="bg-[#8ED06C] h-4 rounded-sm transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {isConfirmed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[250px]">
            <h2 className="text-[16px] font-bold text-[#333333]">
              Downloaded successfully
            </h2>
            <div className="flex justify-center mt-5">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2089 30.1527C11.6633 30.6105 11.1909 30.8375 10.6989 30.8327C9.56533 30.8212 8.62105 29.6617 6.7325 27.3429L4.20755 24.2424C3.16773 22.9657 3.04051 21.0647 3.89891 19.6302C4.87945 17.9917 6.75993 17.5327 8.22548 18.3549M18.2024 14.166C19.5209 12.7758 20.9279 11.3864 22.4625 9.97734C23.2029 9.29757 24.1257 9.0568 24.9987 9.2107"
                  stroke="#004324"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M23.5108 27.1843C27.2773 22.8187 30.9133 19.857 35.4806 15.663C36.8476 14.4076 37.0588 12.2072 35.9863 10.6482C34.8466 8.9913 32.6808 8.66013 31.215 9.97733C27.0313 13.7366 23.7765 17.3562 20.689 21.225C20.527 21.428 20.446 21.5295 20.3618 21.5867C20.1486 21.7315 19.8821 21.7332 19.6676 21.5907C19.583 21.5345 19.5018 21.4348 19.3395 21.2358L17.6943 19.2178C16.1931 17.3765 13.5006 17.5803 12.2472 19.6302C11.3701 21.0647 11.5001 22.9657 12.5626 24.2423L15.1425 27.3428C17.0721 29.6617 18.037 30.8212 19.1953 30.8327C20.3536 30.844 21.406 29.624 23.5108 27.1843Z"
                  stroke="#004324"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadInvoice;
