import { useState } from 'react'
import { ChatState } from '../context/chatProvider';

const UserChatPage = () => {
    const { selectedChat, setSelectedChat, chats, user, setChats } = ChatState();

    return (
        <div>UserChatPage</div>
    )
}

export default UserChatPage;