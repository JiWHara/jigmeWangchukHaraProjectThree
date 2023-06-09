// Import necessary modules
import { useState, useEffect } from 'react';
import axios from 'axios';

// Define functional component
const MemeSelector = () => {
    // Declare state variables using the useState hook as an empty array/string
const [memeImages, setMemeImages] = useState([]);
const [selectedMeme, setSelectedMeme] = useState({});
const [text1, setText1] = useState('');
const [text2, setText2] = useState('');
const [memeUrl, setMemeUrl] = useState('');
// useEffect hook to fetch the list of meme images on component mount
useEffect(() => {
  // Make a GET request to the Imgflip API to fetch the list of meme images
  axios({
    url: "https://api.imgflip.com/get_memes",
    method: "GET",
    dataResponse: "json",
  }).then((res) => {
    // Set the state variable for meme images to the array of memes in the response data
    setMemeImages(res.data.data.memes);
  });
}, []);

// Handle form submission for editing captions
const handleSubmit = (event) => {
  event.preventDefault();
  // Create URLSearchParams object to send as POST request parameters
  const params = new URLSearchParams();
  // appended necessary parameteres for caption post request as per imgflip documentation: https://imgflip.com/api
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
// render the component
return(
<>
<div className="memeForm">
<form onSubmit={handleSubmit}>
  <label>
    Select a meme image:
    {/* displays a dropdown list menu and makes it so that the current selected value is the selectedMeme always*/}
    <select value={selectedMeme.id} onChange={(event) => {
      const id = event.target.value;
      const selected = memeImages.find((meme) => meme.id === id);
      setSelectedMeme(selected);
    }}> 
    {/* memeImages array populates the dropdown menu using map method*/}
      <option>--Select a meme--</option>
      {memeImages.map((meme) => (
        <option value={meme.id} key={meme.id} className="dropDownList">
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
</>
);
}
// export the component
export default MemeSelector;