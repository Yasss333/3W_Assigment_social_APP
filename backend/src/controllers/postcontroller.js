import Post from "../models/postmodel.js"
import User from "../models/usermodel.js";
import mongoose from "mongoose";

const createpostHandler = async (req, res) => {
  try {
    console.log(">>> [Post] Handler called");
    console.log("    [Post] body:", req.body);
    console.log("    [Post] user:", req.user?.username);
    
    const text = String(req.body.text || "").trim();
    
    console.log("    [Post] text length:", text.length);
    
    if (!text) {
      console.log("    [Post] ❌ No text provided");
      return res.status(400).json({message: "Add text"});
    }

    console.log("    [Post] Creating...");
    const post = await Post.create({
      author: {
        userId: new mongoose.Types.ObjectId(req.user.id),
        username: req.user.username,
        avatar: req.user.avatar || "",
      },
      text,
      imageUrl: ""
    });
    
    console.log("    [Post] ✓ Created:", post._id);
    res.status(200).json({message: "Post created!", post});
  } catch (error) {
    console.error(">>> [Post] ERROR:", error.message);
    res.status(500).json({message: error.message});
  }
}

const getfeed=async(req,res)=>{
    try {
        const page=parseInt(req.query.page) ||1;
        const limit=parseInt(req.query.limit)|| 10;
        const skip=(page-1)*limit;

        const [posts , totalpost]=await Promise.all([
            Post.find().sort({createdAt:-1}).skip(skip).limit(limit),
            Post.countDocuments(),
        ])
        res.json({posts, totalpost , page , pages:Math.ceil(totalpost/limit)})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const togglelike=async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        if(!post)return res.status(404).json({message:"Post not found"});

        const userId = new mongoose.Types.ObjectId(req.user.id);
        const alreadyLiked=post.likes.some(id => id.toString() === userId.toString());
        if(alreadyLiked){
            post.likes=post.likes.filter(id=>id.toString()!==userId.toString());
        }
        else{
            post.likes.push(userId);
        }
        await post.save();
        res.json({likes:post.likes.length,liked:!alreadyLiked})
    } catch (error) {
       res.status(500).json({ message: error.message }); 
    }
}


const addComment=async(req,res)=>{
    try {
        const {text}=req.body;
        if(!text) return res.status(400).json({message:"Text required for comment"});
        const post=await Post.findById(req.params.id);
        if(!post) return res.status(404).json({message:"No such post exist!"});

        const comment = {
            userId: new mongoose.Types.ObjectId(req.user.id),
            username:req.user.username,
            avatar:req.user.avatar|| '',
            text
        }
        post.comments.push(comment);
        await post.save();
        res.status(201).json({ comment: post.comments[post.comments.length - 1], total: post.comments.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export {addComment,togglelike,getfeed,createpostHandler};