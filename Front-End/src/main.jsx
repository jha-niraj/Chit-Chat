import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react"
import ChatProvider from "./context/chatProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<ChatProvider>
			<React.StrictMode>
				<ChakraProvider>
					<App />
				</ChakraProvider>
			</React.StrictMode>
		</ChatProvider>
	</BrowserRouter>,
)
