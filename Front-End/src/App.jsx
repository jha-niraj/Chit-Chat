import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

// Importing necessary components and pages from the internal directory:
import InputBox from './components/InputBox';
import UserAuthentication from './pages/UserAuthentication';
import EntryPage from "./pages/EntryPage";
import HomePage from "./pages/HomePage";
import ChatPage from './pages/ChatPage';

export const UserContext = createContext({});

function App() {
	const [ user, setUser ] = useState({});

	useEffect(() => {
		let userInSession = sessionStorage.getItem("user");
		userInSession ? setUser(JSON.parse(userInSession)) : setUser(null);
	}, [])

	return (
		<UserContext.Provider value={{user, setUser}}>
		<Routes>
			<Route path="/" element={<EntryPage />} />
			<Route path="/signup" element={<UserAuthentication endpoint="signup" />} />
			<Route path="/signin" element={<UserAuthentication endpoint="signin" />} />
			<Route path="/homepage" element={<HomePage />} />
			<Route path="/chats" element={<ChatPage />} />
		</Routes>
		</UserContext.Provider>
	)
}

export default App
