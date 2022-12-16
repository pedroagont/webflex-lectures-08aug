import Header from './Header';
import SearchForm from './SearchForm';
import ResultsList from './ResultsList';

import useNasaSearch from '../hooks/useNasaSearch';
import '../styles/App.css';

function App() {
  const { results, handleNasaSearch } = useNasaSearch();

  return (
    <>
      <Header />
      <SearchForm handleNasaSearch={handleNasaSearch} />
      <ResultsList results={results} />
    </>
  );
}

export default App;
