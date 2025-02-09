import { useQuery } from "@tanstack/react-query";

const getCountries = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) throw new Error("Failed to fetch countries");
    return await response.json();
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};
export const useFetchCountries = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["country"],
        queryFn: getCountries,
    });
    return {data,isLoading,isError}
}

 
 

 