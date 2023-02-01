import './App.css';
import {useState} from "react";
import OpenAI from "openai-api";

function App() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [result, setResult] = useState();

  const OpenAI = require('openai-api');

  const OPENAI_API_KEY = "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";

  const openai = new OpenAI(OPENAI_API_KEY);

  (async () => {
    const gptResponse = await openai.complete({
      engine: 'davinci',
      prompt: 'this is a test',
      maxTokens: 5,
      temperature: 0.9,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ['\n', "testing"]
    });

    console.log(gptResponse.data);
  })();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(({ prompt: inputPrompt })),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setInputPrompt("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Open Ai Test</p>
        <form onSubmit={onSubmit}>
          <input
              type="text"
              name="prompt"
              placeholder="Enter What you ask"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
          />
          <input type="submit" value="Submit"/>
        </form>
        <div className="result">{result}</div>
      </header>
    </div>
  );
}

export default App;
