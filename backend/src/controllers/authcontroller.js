import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";

const generatetoken=(user)=>{
  return jwt.sign({
    id:user._id,username:user.name,avatar:user.avatar
  },process.env.JWT_SECRET,
{expiresIn:"7d"})
}

const formatUser = (user) => ({
  id: user._id,
  username: user.name,
  email: user.email,
  avatar: user.avatar
});

const handlerSignin= async (req,res)=>{
    try {
        const {username,email , password }=req.body;
        if(!username || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        const exist=await User.findOne({email});
        if(exist){
            return res.status(400).json({message:'Account already exist pls login'});
        }
        const hashed_password= await bcrypt.hash(password,10);
        const user=await User.create({
                name:username,
                password:hashed_password,
                email:email
        })
        
        const token=generatetoken(user);
        return res.status(200).json({message:"User created succesfuly",user:formatUser(user),token})
    } catch (error) {
        console.log(error.message);
          res.status(500).json({ message: error.message });
          
        }
    }

    const login=async(req,res)=>{
        try {
        const {email, password}=req.body;
        if(!email|| !password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"Please signup first"})
        }
        const verifyPassword=await bcrypt.compare(password,user.password);
        if(!verifyPassword){
            return res.status(400).json({message:'Invalid password'})
        }
        
        const token=generatetoken(user);
        return res.status(200).json({message:"Login successful",user:formatUser(user),token})    
       } catch (error) {
        res.status(500).json({ message: error.message });
       }   
}

export{handlerSignin,login};