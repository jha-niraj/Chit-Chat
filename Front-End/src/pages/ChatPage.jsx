import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import UserChatPage from './UserChatPage';

const ChatPage = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:4001/api/v1/searchusers?search=" + filter, {
            withCredentials: true
        })
            .then((response) => {
                setUsers(response.data.users);
            });
    }, [filter])

    console.log(users);

    return (
        <div className="flex w-full h-screen">
            <div className="max-w-72 border-2 border-black flex flex-col gap-4 p-6 md:p-8">
                <h1 className="text-2xl font-bold ont-sans">Users</h1>
                <input
                    name="search"
                    type="text"
                    id="search"
                    onChange={(e) => {
                        setFilter(e.target.value);
                    }}
                    placeholder="Search users..."
                    className="h-12 w-full border-solid border-2 border-gray-400 rounded-lg pl-3"
                />
                {
                    users && users.map((user, index) => <User key={index} user={user} />)
                }
            </div>
            <div className='w-full border-2 border-red-500'>
                <UserChatPage />
            </div>
        </div>
    )
}

function User({user}) {
    const navigate = useNavigate();
    return (
        <section className="flex items-center justify-center">
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-center gap-4">
                    <h1 className="flex items-center justify-center h-12 font-bold text-2xl w-12 rounded-full bg-gray-200">{user.fullname[0]}</h1>
                    <h1 className="text-lg font-semibold font-sans">{user.fullname}</h1>
                </div>
            </div>
        </section>
    )
}

export default ChatPage;