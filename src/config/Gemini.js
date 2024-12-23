import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCEZGsEineRWQlXFk7orBGYd3Wowf-kJ3Q"; 
const genAI = new GoogleGenerativeAI(apiKey);

async function run(prompt) {
  try {
    
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

   
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    
    const chatSession = model.startChat({
      generationConfig,
      history: [], 
    });

   
    const result = await chatSession.sendMessage(prompt);
    console.log("AI Response:", result.response.text); 
  } catch (error) {
    console.error("Error during API call:", error);
  }
}


export default run;
