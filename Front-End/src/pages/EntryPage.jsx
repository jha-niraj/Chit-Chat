import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EntryPage = () => {
    // let [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const timerId = setTimeout(() => {
    //         setLoading(current => !current);
    //     }, 3000)
    //     return () => clearTimeout(timerId);
    // }, [])

    const navigate = useNavigate();

    return (
        <div className={`flex w-full items-center flex-col justify-center h-screen`}>
            <h1 className="text-4xl font-bold">Chit Chat</h1>
            <p className="text-xl font-medium">A place where you can talk freely</p>
            <div className="w-[50%] flex items-center justify-center">
                <button onClick={() => navigate("/signin")} className="h-12 m-2 w-[50%] font-bold text-2xl border-4 border-black rounded-lg">Sign In</button>
            </div>
        </div>
    );
}

export default EntryPage;