import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // Declare state variables using the useState hook
  const [memeImages, setMemeImages] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState({});
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [memeUrl, setMemeUrl] = useState('');

  useEffect(() => {
    // Make a GET request to the Imgflip API to fetch the list of meme images
    axios({
      url: "https://api.imgflip.com/get_memes",
      method: "GET",
      dataResponse: "json",
    }).then((res) => {
      // Set the state variable for meme images to the array of memes in the response data
      setMemeImages(res.data.data.memes);
      console.log(res);
    });
  }, []);

  // Handle form submission for editing captions
  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.append('template_id', selectedMeme.id);
    params.append('username', 'terryfox231');
    params.append('password', 'bananabutt123');
    params.append('text0', text1);
    params.append('text1', text2);

    // Make a POST request to the Imgflip API to caption the selected meme image with the submitted text
    axios.post('https://api.imgflip.com/caption_image', params)
      .then((res) => {
        // Set the state variable for the URL of the captioned meme image to the URL in the response data
        setMemeUrl(res.data.data.url);
      });
  };

  return (
    <div className="App">
      <header>
        <h1>MEME GENERATOR</h1>
      </header>
      <div className="meme-form">
        <form onSubmit={handleSubmit}>
          {/* Select meme image */}
          <label>
            Select a meme image:
            <select value={selectedMeme.id} onChange={(event) => {
              const id = event.target.value;
              const selected = memeImages.find((meme) => meme.id === id);
              setSelectedMeme(selected);
            }}>
              <option value="">--Select a meme--</option>
              {memeImages.map((meme) => (
                <option value={meme.id} key={meme.id}>
                  {meme.name}
                </option>
              ))}
            </select>
          </label>
          <br />
          {/* Input for first caption */}
          <label>
            Enter text for caption 1:
            <input type="text" value={text1} onChange={(event) => setText1(event.target.value)} />
          </label>
          <br />
          {/* Input for second caption */}
          <label>
            Enter text for caption 2:
            <input type="text" value={text2} onChange={(event) => setText2(event.target.value)} />
          </label>
          <br />
          {/* Submit button */}
          <button type="submit" disabled={!selectedMeme.id}>
            Create meme
          </button>
        </form>
      </div>
      {/* Display the captioned meme image if it exists */}
      {memeUrl && <img src={memeUrl} alt="Captioned meme"/>}
    </div>
  );
}

export default App;
// imgflip user and password for post param 
// user: terryfox231
// pass: bananabutt123
