import InputBox from "../components/InputBox";
import Button from "../components/Button";
import PageAnimation from "./pageAnimation";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserAuthentication = ({ endpoint }) => {
    const [ fullname, setFullname ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
			const response = await axios.post("http://localhost:3001/api/v1/" + endpoint, {
				fullname,
				email,
				password
			})
			toast.success(response.data.msg);
            if(endpoint == "signup") {
                setTimeout(() => {
                    navigate("/signin");
                }, 2000)
            } else {
                localStorage.setItem("token", response.data.token);
                setTimeout(() => {
                    navigate("/homepage");
                }, 2000)
            }
		} catch(err) {
			toast.error(err.response.data.msg);
		} 
    }

    // Debounce Example:
    // const [ inputValue, setInputValue ] = useState("");
    // const [ debouncedValue, setDebouncedValue ] = useState("");

    // useEffect(() => {
    //     const timerId = setTimeout(() => {
    //         setDebouncedValue(inputValue)
    //     }, 500)
    //     return () => clearTimeout(timerId);
    // }, [inputValue])

    return (
        <PageAnimation keyValue={ endpoint }>
            <Toaster />
            <section className="flex items-center justify-center h-screen flex-col">
                <form className="w-96 shadow-2xl p-4 rounded-lg flex flex-col gap-2"  onSubmit={(e)=>handleSubmit(e)}>
                    <h1 className="text-3xl font-medium text-center">
                        {
                            endpoint == "signup" ? "Please, Sign Up" : "Welcome back, User"
                        }
                    </h1>
                    {
                        endpoint == "signup" ? <InputBox 
                                                    label="Full Name"
                                                    name="fullname"
                                                    type="text"
                                                    id="fullname"
                                                    placeholder="Niraj Jha"
                                                    onChange={e => setFullname(e.target.value)}
                                                />
                        : ""
                    }
                    <InputBox 
                        label="Email"
                        name="email" 
                        type="email" 
                        id="email" 
                        placeholder="flamingocool2@gmail.com" 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputBox 
                        label="Password" 
                        name="password" 
                        type="password" 
                        id="password" 
                        placeholder="********"
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <Button label="Submit" />
                    <div className="flex items-center justify-center gap-2">
                        <hr className="w-full h-1 bg-gray-300" />
                        Or
                        <hr className="w-full h-1 bg-gray-300" />
                    </div>
                    <div className="flex items-center justify-center">
                        {
                            endpoint == "signup" ? <h1 className="text-md font-semibold">Already have an account, <Link to="/signin" className="underline hover:scale-105 hover:text-sky-600">login here</Link></h1> : <h1 className="text-md font-semibold">Don't have an account, <Link to="/signup" className="hover:text-sky-600 underline hover:scale-105 transition-all">create here</Link></h1>
                        }
                    </div>
                </form>
            </section>
        </PageAnimation>
    )
}

export default UserAuthentication;