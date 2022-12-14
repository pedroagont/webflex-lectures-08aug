function SearchForm(props) {
  const { handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input type="text" name="search" />
      <button stype="submit">Search!</button>
    </form>
  );
}

export default SearchForm;
