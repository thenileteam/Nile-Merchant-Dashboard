import { useState } from "react";
const ConnectDomain = () => {
  const arr = [
    { heading: "A Record", name: "@", requiredValue: " 23.227.38.65" },
    { heading: "CNAME", name: "www.", requiredValue: "mynile.store" },
    {
      heading: "TXT RECORD",
      name: "nile_verification",
      requiredValue: " 023u69gfcshuis08643dvjsfg.,jhur",
    },
  ];
  const [connectDomain, setConnectDomain] = useState(false);
  const [showAdditionalStep, setShowAdditionalStep] = useState(false);
  return (
    <>
      <button
        type="button"
        className="border-2 border-lightGreen text-lightGreen rounded-md p-2 mb-1"
        onClick={() => setConnectDomain(true)}
      >
        Connect Domain
      </button>
      {connectDomain && (
        <article className="fixed z-50 bg-black/40 inset-0 overflow-y-scroll">
          <div className={`container max-w-[390px] mx-auto ${showAdditionalStep?'mt-5':'mt-20'} `}>
            <div className={`bg-white p-3 rounded-md relative`}>
              {/* Close Button */}
              <span
                className="text-lightGreen rounded-md float-right w-5 text-center text-xl cursor-pointer"
                onClick={() => setConnectDomain(false)}
              >
                x
              </span>
              <h3 className="text-green text-2xl rounded-sm">
                Connect Existing Domain
              </h3>
              <div className="bg-[#EAF4E2] p-3 mt-2">
                <label htmlFor="domainSearch">Enter your domain name</label>
                <input
                  type="search"
                  name="domainSearch"
                  className="block w-full p-1 rounded-sm  outline-none focus:outline-lightGreen focus:outline"
                  placeholder="e.g Example.com.ng"
                />
              </div>
              {/* im toggling the additional step for now  */}
              <button
                className="bg-green text-white p-1 mt-2 w-[63px] rounded-md lg:translate-x-[300px]"
                onClick={() => setShowAdditionalStep((prev) => !prev)}
              >
                Next
              </button>
            </div>
            {/* second dropdown pop up */}
            <div
              className={`bg-[#EAF4E2] rounded-md mt-2 p-4 ${
                showAdditionalStep ? "visible" : "invisible"
              }`}
            >
              <h3 className="text-lightBlack font-bold text-2xl text-center">
                Verify Domain Ownership
              </h3>
              <p className="text-lightBlack my-2 font-normal">
                To connect your domain,create the following DNS record in your
                domain provider account settings.
              </p>
              <span className="text-green">Just copy it</span>
              {/* lines */}
              <div className="bg-lightGreen h-[1px] my-3"></div>
              <div className="bg-lightGreen h-[1px]  "></div>
              {/* record  you can change this if it doesnt work well with what u intend to do*/}
              <div className="mt-3">
                {arr.map((item) => {
                  return (
                    <div className="mt-2">
                      <h4>{item.heading}</h4>
                      <p className="font-light">
                        Name:{" "}
                        <span className="text-lightGreen">{item.name}</span>{" "}
                      </p>
                      <p className="font-light">
                        Required Value:{" "}
                        <span className="text-lightGreen">
                          {item.requiredValue}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default ConnectDomain;
