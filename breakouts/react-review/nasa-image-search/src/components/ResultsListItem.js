function ResultsListItem(props) {
  const { item } = props;

  return (
    <article key={item.data[0].nasa_id}>
      <img src={item.links[0].href} alt="nasa result" />
      <h2>{item.data[0].title}</h2>
    </article>
  );
}

export default ResultsListItem;
