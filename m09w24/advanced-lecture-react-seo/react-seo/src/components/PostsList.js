import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

function PostsList() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => setResults(data));
  }, []);

  return (
    <div>
      <Helmet>
        <title>All posts!</title>
        <meta name="description" content="This is the all posts page!" />
        <link rel="canonical" href="https://fdf1-187-190-55-7.ngrok.io/posts" />
      </Helmet>
      <h1>Hello from PostsList! 📑</h1>
      <Link to="/">Go back to homepage</Link>
      <ul>
        {results.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
