import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {login,isLoading,error}=useLogin()
    const [load,setload]=useState(true)


    const handleSubmit=async(e)=>{
        e.preventDefault()
        await login(email,password)
        setload(false)
    }
    return (
        <div>
        <p class={`${load ? 'hidden':'block' } text-center pt-10 text-green-600`}>Please wait...this may take some time..</p>
         <form class="bg-gray-200 mt-16 w-72 p-5 m-auto rounded-md shadow-sm shadow-black" onSubmit={handleSubmit}>
        <h3 class="text-center text-orange-600 font-semibold">Login</h3>
        <label>Email</label><br/>
        <input 
        type="email"
        onChange={(e)=>setEmail(e.target.value)} 
        value={email}
        class="w-60 p-1 rounded-md shadow-sm shadow-blue-700"
        /><br/>
        <label>Password</label><br/>
        <input 
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password} 
        class="w-60 p-1 rounded-md shadow-sm shadow-blue-700"
        /><br/>
        <button disabled={isLoading} class="mt-5 bg-orange-500 p-1 rounded-md shadow-md shadow-black">Login</button>
        {error && <div class=" bg-red-300 mt-5 p-1 rounded-md text-red-700">{error}</div>}

        <p class="pb-4 pt-4">Don't have an account? <a class="text-red-500" href="/signup">Sign up</a></p>
        </form>
        </div>
    );
}
 
export default Login;