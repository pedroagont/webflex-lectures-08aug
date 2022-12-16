import { useState } from 'react';

function useNasaSearch() {
  const [results, setResults] = useState([]);

  const handleNasaSearch = (searchValue) => {
    const URL_NASA_API = `https://images-api.nasa.gov/search?q=${searchValue}&media_type=image`;
    return fetch(URL_NASA_API)
      .then((res) => res.json())
      .then((data) => setResults(data.collection.items));
  };

  return { results, handleNasaSearch };
}

export default useNasaSearch;
