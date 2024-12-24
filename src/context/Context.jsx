import { createContext, useEffect, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompt] = useState(""); // Last prompt user sent
  const [prevPrompts, setPreviousPrompts] = useState([]); // All previous prompts
  const [showResult, setShowResult] = useState(false); // Toggle to show result page
  const [loading, setLoading] = useState(false); // Loading spinner state
  const [resultData, setResultData] = useState(""); // API result data

  // Delays displaying text word by word
  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, index * 75);
  };
  const newChat=()=>{
    setLoading(false);
    setShowResult(false);
  }

  // Send a prompt and fetch the response
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    if (prompt !== undefined) {
      // If the prompt is from recent prompts
      response = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      // If the prompt is typed manually
      setPreviousPrompts([...prevPrompts, input]);
      setRecentPrompt(input);
      response = await run(input);
    }

    // Process the response and format bold headings
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i % 2 !== 0) {
        newResponse += `<b>${responseArray[i]}</b>`;
      } else {
        newResponse += responseArray[i];
      }
    }
    let formattedResponse = newResponse.split("*").join("<br>");
    let wordsArray = formattedResponse.split(" ");

    // Display text with a delay
    for (let i = 0; i < wordsArray.length; i++) {
      delayPara(i, wordsArray[i] + " ");
    }

    setLoading(false);
    setInput("");
  };

  // Navigate to the detailed page
  const navigateToPromptDetail = (prompt) => {
    setRecentPrompt(prompt); // Set the current prompt
    setShowResult(true); // Show result page
    setResultData(""); // Clear previous result
    onSent(prompt); // Fetch new result for the prompt
  };

  const contextValue = {
    prevPrompts,
    setPreviousPrompts,
    onSent,
    navigateToPromptDetail,
    setRecentPrompt,
    recentPrompts,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
