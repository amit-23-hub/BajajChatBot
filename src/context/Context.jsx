import { createContext, useState } from "react";
import runChat from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
	const [input, setInput] = useState("");
	const [recentPrompt, setRecentPrompt] = useState("");
	const [prevPrompts, setPrevPrompts] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [loading, setLoading] = useState(false);
	const [resultData, setResultData] = useState("");

	const delayPara = (index, nextWord) => {
		setTimeout(function () {
			setResultData((prev) => prev + nextWord);
		}, 10 * index);
	};
    const newChat = () =>{
        setLoading(false);
        setShowResults(false)
    }

	const onSent = async (prompt) => {
		setResultData("");
		setLoading(true);
		setShowResults(true);
		let response;
		
		try {
			if(prompt !== undefined) {
				response = await runChat(prompt);
				setRecentPrompt(prompt);
			} else {
				setPrevPrompts(prev=>[...prev,input]);
				setRecentPrompt(input);
				response = await runChat(input);
			}
    
			// Process and display the response
			let responseArray = response.split("");
			for (let i = 0; i < responseArray.length; i++) {
				delayPara(i, responseArray[i]);
			}
		} catch (error) {
			console.error("Error:", error);
			setResultData("Sorry, I encountered an error.");
		} finally {
			setLoading(false);
			setInput("");
		}
	};

	const contextValue = {
		prevPrompts,
		setPrevPrompts,
		onSent,
		setRecentPrompt,
		recentPrompt,
		input,
		setInput,
		showResults,
		loading,
		resultData,
		newChat,
	};

	return (
		<Context.Provider value={contextValue}>{props.children}</Context.Provider>
	);
};

export default ContextProvider;
