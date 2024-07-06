import { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

import userAvatar from "../assets/userAvatar.jpg";
import { } from "lucide-react";

const HomePage = () => {
    const navigate = useNavigate();
    // const { user, setUser } = useContext(UserContext);
    const [ user, setUser ] = useState(JSON.parse(sessionStorage.getItem("user")));

    const handleSignOut = () => {
        sessionStorage.removeItem("user");
        setUser(null);
        navigate("/signin");
    }

    const contacts = [
        {
            name: "Sonali Jha",
            status: "Available",
        },
        {
            name: "Manav Jha",
            status: "Available",
        },
        {
            name: "Bhavana Jha",
            status: "Available",
        },
        {
            name: "Shrawani Jha",
            status: "Available",
        },
        {
            name: "Shaili Jha",
            status: "Available",
        },
        {
            name: "Nandani Jha",
            status: "Available",
        },
        {
            name: "Shruti Jha",
            status: "Available"
        }
    ]

    return (
        <section className="">
            <div className="flex items-center justify-end bg-slate-300">
                <h1 className="text-xl">Hey, <span className="font-bold">{user.fullname}</span></h1>
                <button onClick={handleSignOut} className="p-1 text-center m-2 hover:ring-4 transition-all font-bold text-2xl border-2 border-black rounded-lg">Sign Out</button>
            </div>
            <div className="flex gap-4 justify-center">   
                <div className="bg-white w-[25%] flex flex-col gap-6">
                    <div className="flex flex-col gap-4 items-center justify-center w-full">
                        <div className="flex items- gap-3 justify-center w-full">
                            <div className="">
                                <img className="h-24" src={userAvatar} />
                            </div>
                            <div className="flex flex-col justify-center">  
                                <h1 className="text-left text-xl font-semibold">Niraj Jha</h1>
                                <p className="text-left">My Account</p>
                            </div>
                        </div>
                        <hr className="w-full bg-gray-300 h-0.5" />
                    </div>
                    <div className="flex flex-col w-full gap-5 justify-center my-1">
                        <h1 className="font-semibold text-2xl">Messages</h1>
                        {
                            contacts.map(({ name, status }) => {
                                return <Card name={name} status={status} />
                            })
                        }
                    </div>
                </div>
                <div className="bg-gray-300 w-[75%]">
                    
                </div>
            </div>
        </section>
    )   
}

const Card = ({ name, status }) => {
    return (
        <div className="flex gap-3 w-full flex-col items-center justify-center">
            <div className="flex items- gap-5 justify-center w-full">
                <div className="w-[40%]">
                    <img className="h-18" src={userAvatar} />
                </div>
                <div className="flex w-[60%] flex-col justify-center">  
                    <h1 className="text-left text-xl font-semibold">{name}</h1>
                    <p className="text-left">{status}</p>
                </div>
            </div>
            <hr className="w-full bg-gray-300 h-0.5" />
        </div>
    )
}

export default HomePage;