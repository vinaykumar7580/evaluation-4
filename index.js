const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
require("dotenv").config()
const {userRouter}=require("./routes/user.routes")
const {userauth}=require("./middleware/userauth")
const {postRouter}=require("./routes/posts.routes")

const app=express()
app.use(express.json())
app.use(cors())

app.use("/users",userRouter)

app.use(userauth)
app.use("/posts",postRouter)


app.listen(8080,async()=>{
    try{
        await mongoose.connect(process.env.mongoURL)
        console.log("mongoDB connected")

    }catch(err){
        console.log(err)
        console.log("mongoDB not connected")

    }
    console.log("server is running on port 8080")
})