import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [ user, setUser ] = useState();
    const [ selectedChat, setSelectedChat ] = useState();
    const [ chats, setChats ] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(sessionStorage.getItem("user"));
        setUser(userInfo);

        if(!userInfo) {
            navigate("/signin")
        }
    }, []);

    return (
        <ChatContext.Provider value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}>
            {
                children
            }
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;