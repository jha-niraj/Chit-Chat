import { useState } from 'react';
import { Routes, Route } from "react-router-dom";

// Importing necessary components and pages from the internal directory:
import InputBox from './components/InputBox';
import UserAuthentication from './pages/UserAuthentication';
import EntryPage from "./pages/EntryPage";
import HomePage from "./pages/HomePage";

function App() {

	return (
		<Routes>
			<Route path="/" element={<EntryPage />} />
			<Route path="/signup" element={<UserAuthentication endpoint="signup" />} />
			<Route path="/signin" element={<UserAuthentication endpoint="signin" />} />
			<Route path="/homepage" element={<HomePage />} />
		</Routes>
	)
}

export default App
