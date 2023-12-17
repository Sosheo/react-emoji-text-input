import './App.css';
import { EmojiInput } from "./components" //EmojiTextarea

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Emoji Text Input</h1>
        <p>A simple text input and textarea react component with built in emoji menu.</p>

        <EmojiInput type="textinput" placeholder="Enter text here, type ':' to open the emoji menu" />

        <EmojiInput type="textarea" placeholder="Enter text here, type ':' to open the emoji menu" />

        {/* <EmojiTextarea placeholder="Enter text here, type ':' to open the emoji menu" /> */}

        <p>`npm install emoji-text-input`</p>
      </header>
    </div>
  );
}

export default App;
