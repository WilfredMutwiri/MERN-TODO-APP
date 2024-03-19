import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {signup,isLoading,error}=useSignup()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        await signup(email,password)
    }
    return (
        <form class="bg-gray-200 mt-16 w-72 p-5 m-auto rounded-md shadow-sm shadow-black" onSubmit={handleSubmit}>
        <h3 class="text-center text-orange-600 font-semibold">Sign Up</h3>
        <label>Email</label><br/>
        <input 
        type="email"
        onChange={(e)=>setEmail(e.target.value)} 
        value={email}
        class="w-60 rounded-md shadow-sm shadow-blue-700"
        /><br/>
        <label>Password</label><br/>
        <input 
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password} 
        class="w-60 rounded-md shadow-sm shadow-blue-700"
        /><br/>
        <button disabled={isLoading} class="mt-5 bg-orange-500 p-1 rounded-md shadow-md shadow-black">Sign up</button>

        {error && <div class=" bg-red-300 mt-5 p-1 rounded-md text-red-700">{error}</div>}
        </form>
    );
}
 
export default Signup;