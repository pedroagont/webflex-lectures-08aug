import Home from './Home';
import PostsList from './PostsList';
import PostDetails from './PostDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
