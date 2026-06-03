import mongoose, { Types }  from "mongoose";

export const commentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    username:{
        type:String ,
        required:true
    },
    avatar:{
        type:String,
        default:function(){
            return `https://dicebear.com/api/avataaars/${encodeURIComponent(this.username)}.svg`;
        }
    },
    text:{
        type:String,
        required:true
    }
},{timestamps:true})

const postSchema= new mongoose.Schema({
    author:{
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        username:{
            type:String,
            required:true
        },
        avatar:{
            type:String,
            default:""
        }
    },
    text:{
        type:String,
        default:''
    },
    imageUrl:{
        type:String,
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    comments:[commentSchema]
},{timestamps:true})


// postSchema.pre("save", function(next){
//     if(!this.text && !this.imageUrl){
//         return next(new Error ("Post must contain either text or image "))
//     }
//     next();
// });
postSchema.pre("save", function() {
    if (!this.text && !this.imageUrl) {
        throw new Error("Post must contain either text or image");
    }
});


const Post = mongoose.model("Post", postSchema);
export default Post;