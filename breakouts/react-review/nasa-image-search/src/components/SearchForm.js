import { useState } from 'react';

function SearchForm(props) {
  const { handleNasaSearch } = props;
  const [message, setMessage] = useState('Type your search in the bar!');

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchValue = e.target.elements.search.value;

    handleNasaSearch(searchValue)
      .then(() => setMessage('Here are your results!'))
      .catch((err) => setMessage(`Error: ${err.message}`));
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <span className="message">{message}</span>
      <input type="text" name="search" />
      <button stype="submit">Search!</button>
    </form>
  );
}

export default SearchForm;
