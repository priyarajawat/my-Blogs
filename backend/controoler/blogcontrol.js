import mongoose from "mongoose";
import Blog from "../model/Blog"
import User from "../model/User";

export const getAllBlogs = async (req,res,next)=>{
    let blogs ;
    try{
        blogs = await Blog.find()

    }
    catch (err){
        return console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message:"No Blogs found"})
    }
    return res.status(200).json({blogs})
}
export const addBlog =async (req,res,next)=>{
    const {title, discription ,image,user}=req.body;

    let existinguser ;
    try{
        existinguser = await User.findById(user);

    }
    catch(err){
        return console.log(err)
    }
    if(!existinguser){
        return res.status(400).json({message:"Unable to find user By This Id"})
    }
    
    const blog = new Blog({
        title, discription,image,user,
    });
    try{
      const session = await mongoose.startSession()
      session.startTransaction();
      await blog.save();
      existinguser.blogs.push(blog)
      await existinguser.save({session})
      await session.commitTransaction();
    }
    catch(err){
        console.log(err)
        return res.status(500).json({message:err})
    }
    return res.status(200).json({blog})
}

export const updateBlog=async(req,res,next)=>{
    const {title, discription }=req.body;
    const blogId = req.params.id;
    let blog;
    try{
         blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            discription
        })
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"unable to update the blog"})
    }
    return res.status(200).json({blog})
   
}

export const getByid =async (req,res,next)=>{
const id = req.params.id;
let blog;
try{
    blog=await Blog.findById(id)
}
catch (err){
    return console.log(err)
}
if(!blog){
    return res.status(404).json({message:"NO blog found"})
}
return res.status(200).json({blog})
}


 export const deleteByid = async (req,res,next)=>{
const id = req.params.id;
let blog;
try{
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog)
    await blog.user.save()
}
catch (err){
    return console.log(err)
}
if(!blog){
    return res.status(500).json({message:"Unable to delete"})
}
return res.status(200).json({message : "Successfully deleted"})

}
export const getByuserId = async (req,res,next)=>{
    const userId = req.params.id
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs")
    }
    catch (err){
        return console.log(err)
    }
    if(!userBlogs){
        return res.status(500).json({message:"No blog found"})
    }
    return res.status(200).json({blogs:userBlogs})

}