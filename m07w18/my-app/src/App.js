import { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  const [shibaImg, setShibaImg] = useState(
    'https://media.tenor.com/FawYo00tBekAAAAC/loading-thinking.gif'
  );

  const handleDecrement = () => setCounter(counter - 1);
  const handleIncrement = () => setCounter(counter + 1);

  useEffect(() => {
    console.log('This is a side effect apart from rendering!');
    document.title = `Your count: ${counter}`;
  }, [counter]);

  useEffect(() => {
    const changeImgInterval = setInterval(() => {
      fetch('https://shibe.online/api/shibes')
        .then((res) => res.json())
        .then((data) => setShibaImg(data[0]));
    }, 2000);

    const cleanUp = () => {
      clearInterval(changeImgInterval);
    };

    return cleanUp;
  }, []);

  return (
    <>
      <div style={{ maxWidth: '200px' }}>
        <img src={shibaImg} alt="shiba inu" width="100%" />
      </div>
      <div>
        <button onClick={handleDecrement}>Decrement</button>
        <p>Your count: {counter}</p>
        <button onClick={handleIncrement}>Increment</button>
      </div>
    </>
  );
}

export default App;
