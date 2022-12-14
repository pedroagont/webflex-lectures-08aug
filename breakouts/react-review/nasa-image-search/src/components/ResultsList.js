import ResultsListItem from './ResultsListItem';

function ResultsList(props) {
  const { results } = props;

  return (
    <div className="results-list">
      {results.map((item) => (
        <ResultsListItem key={item.data[0].nasa_id} item={item} />
      ))}
    </div>
  );
}

export default ResultsList;
