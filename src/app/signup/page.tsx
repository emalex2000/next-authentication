"use client";

import Link from 'next/link';
import React, {useEffect} from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';




export default function SignUpPage(){
    const router = useRouter()
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup = async ()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/user/signup", user);
            console.log("Sign Up sucess", response.data);
            router.push("/login");


        } catch (error: any) {
            console.log("Sign Up failed", error.message);
            toast.error(error.message);

        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username
            .length > 0) {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
            }

    }, [user]);
    return (
    <>
        <div className="flex mx-auto justify-center bg-gradient-to-r from-blue-500 to-red-500 h-screen">
        
            <div className="border border-solid w-[40rem] px-4 py-3 bg-white items-center max-h-[50rem] rounded-lg">
                <div className="w-[35rem]">
                    <h1 className='font-bold text-3xl text-center mt-4'>{loading ? "Processing":"Sign Up"}</h1>
                    <div className="flex flex-col ">

                        <div className='flex flex-col mt-12'>
                            <label className='font-bold' htmlFor="username">Username</label>
                            <input 
                                className="border-b shadow-sm focus:outline-none h-9 p-1"
                                type="text" 
                                id="username"
                                value={user.username}
                                onChange={(e) => setUser({...user, username:e.target.value})}
                                placeholder="Please Input Your Username"
                            />
                        </div>
                        

                        <div className='flex flex-col mt-4'>
                            <label className='font-bold' htmlFor="email">Email</label>
                            <input 
                                className='border-b shadow-sm focus:outline-none h-9 p-1'
                                type="email" 
                                id="email"
                                value={user.email}
                                onChange={(e) => setUser({...user, email:e.target.value})}
                                placeholder="Please Input Your email"
                            />
                        </div>

                        <div className='flex flex-col mt-4'>
                            <label className='font-bold' htmlFor="password">Password</label>
                            <input 
                                className='border-b shadow-sm focus:outline-none h-9 p-1'
                                type="password" 
                                id="password"
                                value={user.password}
                                onChange={(e) => setUser({...user, password:e.target.value})}
                                placeholder="Please Input Your Password"
                            />
                        </div>

                        <a className='mt-4 mb-6 text-end' href="">Forgot Password?</a>
                        <button
                            onClick={onSignup}
                            type="submit"
                            className="h-9 hover cursor-pointer hover:opacity-80 bg-gradient-to-r from-blue-700 to-red-500 text-white border mt-2 rounded-lg"
                        >{buttonDisabled ? "Fill the form":"Sign Up"}</button>

                        <p className='mt-4 mb-9'>Already Have an Account? <Link rel="stylesheet" href="/login" className='text-blue-500' >Login Here</Link></p>
                    </div>
                </div>
            </div>

        </div>
    </>
    )
};