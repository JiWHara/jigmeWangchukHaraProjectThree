import './App.css';
import MemeSelector from './components/MemeSelector.js';
import DocumentTitle from './components/Title';

function App() {
<DocumentTitle />
  return (
    <div className="App">
      <header>
        <h1>Meme Generator</h1>
      </header>
      <section>
      <MemeSelector />
        
      </section>
      <footer>
        <p>Created at <a href='https://junocollege.com/'>Juno College</a></p>
      </footer>
    </div>
    
  );
}

export default App;
// imgflip user and password for post param 
// user: terryfox231
// pass: bananabutt123

// split form into two requests, one for selecting meme template and another for submitting the inputted caption