import useNasaSearch from './hooks/useNasaSearch';
import './App.css';

function App() {
  const { results, handleSubmit } = useNasaSearch();

  return (
    <>
      <form onSubmit={handleSubmit} className="search-form">
        <input type="text" name="search" />
        <button stype="submit">Search!</button>
      </form>
      <div className="results-list">
        {results.map((item) => (
          <article key={item.data[0].nasa_id}>
            <img src={item.links[0].href} alt="nasa result" />
            <h2>{item.data[0].title}</h2>
          </article>
        ))}
      </div>
    </>
  );
}

export default App;
