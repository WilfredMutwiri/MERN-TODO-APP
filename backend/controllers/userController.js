const User=require('../models/userModel')
//require jwt
const jwt=require('jsonwebtoken')
//create token
const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
};

// Middleware function to handle CORS headers
// const handleCors = (req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://todo-app-ashen-tau.vercel.app');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// };

//login controller
const loginUser=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.login(email,password)
        const token=createToken(user._id)
        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
//signup controller
const signupUser=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await User.signup(email,password)
        const token=createToken(user._id)
        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
//export controllers
module.exports={
    loginUser,
    signupUser,
}