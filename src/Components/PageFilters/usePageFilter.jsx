import { useState, useMemo } from "react";

 export const useFilter = (data, filterFunction) => {
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleActiveFilterChange = (filter) => {
      setSelectedFilter(filter);
    };
  
    const handleSearch = (query) => {
      setSearchTerm(query);
    };
  
    // Filter data based on selected filter and search term
    const filteredItems = useMemo(() => {
      if (!data) return [];
  
      let filterItems = data;
  
      if (filterFunction) {
        filterItems = filterFunction(filterItems, selectedFilter);
      }
  
      if (searchTerm) {
        filterItems = filterItems.filter((item, i) => {
          const lowerCaseQuery = searchTerm.toLowerCase();
           
          return (
            (item.id && item.id.toString().includes(lowerCaseQuery)) ||
            (item.name && item.name.toLowerCase().includes(lowerCaseQuery)) ||
            (item.price && item.price.toString().includes(lowerCaseQuery)) ||
              (item.email && item.email.toLowerCase().includes(lowerCaseQuery)) 
            //    (item.items[i]?.name && item.items[i]?.name.toLowerCase().includes(lowerCaseQuery)) ||
            //    (item.customer[i]?.name && item.customer[i]?.name.toLowerCase().includes(lowerCaseQuery))
              
          );
        });
        }
      return filterItems
    }, [data, selectedFilter, searchTerm, filterFunction]); 
    const noResults = filteredItems.length === 0;
    return {
      selectedFilter,
      searchTerm,
      handleActiveFilterChange,
      handleSearch,
      filteredItems,
      noResults
    };
  };
  
//   check recent customer;
export const isRecentCustomer = (customer) => {
    if (!customer.createdAt) return false;  
    
    const createdDate = new Date(customer.createdAt);
    const today = new Date();
    // Calculate the difference in days
    const diffInDays = (today - createdDate) / (1000 * 60 * 60 * 24);
  
    return diffInDays <= 7;
  };
  
  
