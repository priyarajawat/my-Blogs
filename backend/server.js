import express from "express"
import mongoose from "mongoose"
import Blogrouter from "./Routes/blogroutes"
import router from "./Routes/routes"

const app = express()
app.use(express.json())



app.use("/user",router)
app.use("/blog",Blogrouter)

mongoose.connect("mongodb+srv://admin:LI3RAuUx1bL9pH7c@cluster0.p5lwyxb.mongodb.net/Blog?retryWrites=true&w=majority").then(()=>{
    app.listen(8080,()=>{
        console.log("server start on port http://localhost:8080")
    })
})

