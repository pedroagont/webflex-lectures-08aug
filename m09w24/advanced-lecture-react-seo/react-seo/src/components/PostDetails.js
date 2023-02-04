import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function PostDetails() {
  const [details, setDetails] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setDetails(data));
  }, [id]);

  if (!details) {
    return <h2>Loading details...</h2>;
  }

  return (
    <div>
      <Helmet>
        <title>{details.title}</title>
        <meta name="description" content={details.body.slice(0, 80)} />

        <link
          rel="canonical"
          href={`https://fdf1-187-190-55-7.ngrok.io/posts/${id}`}
        />
      </Helmet>
      <h2>{details.title}</h2>
      <p>{details.body}</p>
      <Link to="/posts">Go back to /posts</Link>
    </div>
  );
}

export default PostDetails;
