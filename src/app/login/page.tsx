"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";
import toast from 'react-hot-toast';



export default function LoginPage(){
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const onLogin = async ()=>{
        try {
            setLoading(true);
            const response = await axios.post("/api/user/login", user)
            console.log("login successful", response.data)
            router.push("/homepage")

        } catch (error:any) {
            console.log("login failed", error.message);
            toast.error(error.message);

        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        if (user.email.length > 0 
            && user.password.length > 0 
            && user.email.length > 0
            ){setButtonDisabled(false)} 

        else{setButtonDisabled(true)}
    }, [user])
    return (
    <>
        <div className="flex mx-auto justify-center bg-gradient-to-r from-blue-500 to-red-500 h-screen">
        
            <div className="border border-solid w-[40rem] px-3 py-3 bg-white items-center max-h-[50rem] rounded-lg">
                <div className="w-[35rem]">
                    <h1 className='font-bold text-3xl text-center mt-4'>{loading ? "Login": "processing"}</h1>
                    <div className="flex flex-col ">
            
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
                            onClick={onLogin}
                            type="submit"
                            className="h-9 cursor-pointer bg-gradient-to-r from-blue-700 to-red-500 text-white border mt-2 rounded-lg"
                        >{buttonDisabled ? "fill the form": "Sign In"}</button>

                        <p className='mt-4 mb-9'>don't have an account? <Link href="/signup" className='text-blue-500'>Sign Up Here</Link></p>
                    </div>
                </div>
            </div>
            
        </div>
    </>
    )
};