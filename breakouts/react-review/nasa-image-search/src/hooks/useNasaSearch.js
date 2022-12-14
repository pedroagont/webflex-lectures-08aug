import { useState } from 'react';

function useNasaSearch() {
  const [results, setResults] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchValue = e.target.elements.search.value;
    const URL_NASA_API = `https://images-api.nasa.gov/search?q=${searchValue}&media_type=image`;
    fetch(URL_NASA_API)
      .then((res) => res.json())
      .then((data) => setResults(data.collection.items));
  };

  return { results, handleSubmit };
}

export default useNasaSearch;
