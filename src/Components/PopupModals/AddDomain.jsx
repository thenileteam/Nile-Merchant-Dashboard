/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import debounce from 'lodash.debounce';
import ApiInstance from "@/Api/ApiInstance";



const AddDomain = () => {
  const [showDomainPopUp, setShowDomainPopUp] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = debounce(async (keyword) => {
    if (!keyword) return;
    
    setLoading(true);
    try {
      const response = await ApiInstance.post('/store/store/domains/suggestions', { keyword });

      console.log(response.data);
      setSuggestions(response.data.responseObject);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
    setLoading(false);
  }, 500); // Adjust the debounce time

  useEffect(() => {
    fetchSuggestions(keyword);
  }, [keyword]);
  return (
    <>
      {/* Trigger Button */}
      <div className="bg-green flex gap-1 items-center text-white p-2 rounded-md">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8V16M16 12H8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
            stroke="white"
            strokeWidth="1.5"
          />
        </svg>
        <button
          type="button"
          onClick={() => setShowDomainPopUp(true)}
        >
          Get Custom Domain
        </button>
      </div>

      {/* Popup */}
      {showDomainPopUp && (
        <article className="fixed z-50 bg-black/40 inset-0 flex items-center justify-center">
          <div
            className={`bg-white p-3 w-[375px] rounded-md transform transition-transform duration-500 ${
              showDomainPopUp ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Close Button */}
            <span
              className="text-lightGreen rounded-md float-right w-5 text-center text-xl cursor-pointer"
              onClick={() => setShowDomainPopUp(false)}
            >
              x
            </span>
            <h3 className="text-green text-2xl rounded-sm">Get New Domain</h3>
            <div className="bg-[#EAF4E2] p-3 mt-4">
              <div className="search relative">
                <label htmlFor="domainSearch">Search Domain</label>
                <input
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  type="search"
                  name="domainSearch"
                  className="block w-full p-1 rounded-sm"
                />
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute right-2 top-8"
                >
                  <path
                    d="M17.5 17.5L22 22"
                    stroke="#8ED06C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                    stroke="#8ED06C"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="flex flex-col gap-2">
                {loading && <p>Loading...</p>}
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id}>{suggestion.name}</div>
                ))}
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default AddDomain;
