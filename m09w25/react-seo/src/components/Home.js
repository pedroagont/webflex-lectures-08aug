import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Home() {
  return (
    <div>
      <Helmet>
        <title>This is the homepage!</title>
        <meta
          name="description"
          content="A really cool react app to learn SEO"
        />

        <link rel="canonical" href="https://fdf1-187-190-55-7.ngrok.io" />
      </Helmet>
      <h1>Hello from App! 👋</h1>
      <Link to="/posts">Go to /posts page</Link>
    </div>
  );
}

export default Home;
