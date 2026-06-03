import mongoose from "mongoose";

import { Schema } from "mongoose";

const userSchema= new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,

    },
    avatar:{
        type:String,
        default:function (){
            return `https://dicebear.com/api/avataaars/${encodeURIComponent(this.name)}.svg`;
        }
    }
},{timestamps:true})




const User=mongoose.model("User",userSchema)
export default User;