import "./App.css";
import { useState } from "react";

function App() {
   //correction object
  const corrections = {
    realy: "really",
    wierd: "weird",
    aropa: "aroopa",
  };
  //state for entered text
  const [input, setInput] = useState("");

  //autocorrecting function
  const autocorrection = async (e) => {
    const setOutput = [];
    if (e.key === " ") {
      //if spacebar is pressed
      const correction = input.split(" ");
      correction.map((word) => {
        if (corrections[word]) {
          //if word is in the corrections object
          setOutput.push(corrections[word]);
        } else {
          //if word is not in the corrections object
          setOutput.push(word);
        }
      });
      const join = setOutput.join(" "); //join the array into a string
      setInput(join); //set the input to the string
    }
  };

  return (
    <div className="App">
      <textarea
        id="textarea"
        spellCheck="false"
        value={input}
        type="text"
        placeholder="Enter your text here"
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => autocorrection(e)}
      />
    </div>
  );
}

export default App;
