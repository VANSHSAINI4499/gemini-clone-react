import { createContext, useEffect } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    // const [input, setInput] = useState("");
    // const [recentPrompts, setRecentPrompt] = useState("");
    // const [prevPrompts, setPreviousPrompts] = useState([]);
    // const [showResult, setShowResult] = useState(false);
    // const[loading,setLoading] = useState(false);
    // const[resultData,setResultData] = useState('');


  const onSent = async (prompt) => {
    try {
      const response = await run(prompt);
      console.log("AI Response:", response); // Log the response
    } catch (error) {
      console.error("Error sending prompt:", error);
    }
  };

  useEffect(() => {
    // Call `onSent` as a side effect when the component mounts
    onSent("What is React JS");
  }, []); // Empty dependency array ensures it runs once on mount

  const contextValue = {
    onSent, // Pass the `onSent` function to context consumers
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
