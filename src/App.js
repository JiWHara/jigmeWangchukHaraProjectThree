// import MemeSelector from './components/MemeSelector.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // declared memeImages state variable using useState and used currentMemeImages function to update state image as
  // data fetched from imgflip api
  const [memeImage, setMemeImage] = useState([]);
  let currentMemeImage = 0;
  
  useEffect(() => {
    axios({
      url: "https://api.imgflip.com/get_memes",
      method: "GET",
      dataResponse: "json",
    }).then((res) => {
    const memes = res.data.data.memes;
    const memeUrl = memes[currentMemeImage].url;
    const memeName = memes[currentMemeImage].name;
    
    setMemeImage(memeUrl);

    console.log("First meme URL:", memeUrl);
    console.log("First meme name:", memeName);

    })
  }, [])

return (
  <div className="App">
    <header>
      <h1>TEST</h1>
      <div>
      {memeImage && <img src={memeUrl} alt={memeName}/>}
      </div>
    </header>
  </div>
  )
}

export default App;
// imgflip user and password for post param 
// user: terryfox231
// pass: bananabutt123
