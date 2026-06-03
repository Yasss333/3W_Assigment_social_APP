import mongoose  from "mongoose";

 export const  mongodbconnect=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        .then(()=>{console.log("Connection done db");
        })
        
    } catch (error) {
        console.log("Db no connectded");
        console.log(error);
    }
}