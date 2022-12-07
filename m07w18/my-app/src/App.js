import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [counter, setCounter] = useState(0);

  const handleDecrement = () => setCounter(counter - 1);
  const handleIncrement = () => setCounter(counter + 1);

  useEffect(() => {
    console.log('This is a side effect apart from rendering!');
    document.title = `Your count: ${counter}`;
  }, [counter]);

  return (
    <div>
      <button onClick={handleDecrement}>Decrement</button>
      <p>Your count: {counter}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}

export default App;
