import express from "express"
import { addBlog, deleteByid, getAllBlogs, getByid, getByuserId, updateBlog } from "../controoler/blogcontrol";
const Blogrouter = express.Router();

Blogrouter.get("/",getAllBlogs)
Blogrouter.post("/add",addBlog)
Blogrouter.put("/update/:id",updateBlog)
Blogrouter.get("/:id",getByid)
Blogrouter.delete("/:id",deleteByid)
Blogrouter.get("/user/:id",getByuserId)
export default Blogrouter;