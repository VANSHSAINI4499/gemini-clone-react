import { createContext, useEffect,useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompt] = useState("");
  const [prevPrompts, setPreviousPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const delayPara=(index,nextWord)=>{
   setTimeout(()=>{setResultData (prev=>prev+nextWord)},index*75)
  }

  const onSent = async (prompt) => {
    setResultData("")
    setLoading(true)
    setShowResult(true)
    let response;
    if(prompt!==undefined){
      response=await run(prompt);
      recentPrompts(prompt);

    }else{
      setPreviousPrompts([...prevPrompts,input])
      setRecentPrompt(input)
      response=await run(input);

    }
    
    let responseArray = response.split("**");
    let newResponse="";
    for(let i=0;i<responseArray.length;i++){
      if (i % 2 !== 0) {
        // Bold sections
        newResponse += `<b>${responseArray[i]}</b>`;
      } else {
        // Regular text
        newResponse += responseArray[i];
      }
    } 
    let newResponse2=newResponse.split("*").join("<br>")
    let newResponseArray=newResponse2.split(" ");
    for(let i=0;i<newResponseArray.length;i++){
      delayPara(i,newResponseArray[i]+" ")
    }
    setLoading(false);
    setInput('')
    // Log the response
  };

   

  const contextValue = {
    prevPrompts,
    setPreviousPrompts,
    onSent,
    setRecentPrompt,
    recentPrompts,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
