const express=require("express")
const jwt=require("jsonwebtoken")
const {PostModel}=require("../model/posts.model")

const postRouter=express.Router()

postRouter.post("/add",async(req,res)=>{
    const token=req.headers.authorization;
    const decoded=jwt.verify(token,"vinay")
    const payload=req.body;
    try{
        if(decoded){
            let post=new PostModel(payload)
            await post.save()
            res.status(200).send({"msg":"new post added"})
        }else{
            res.status(400).send({"msg":"please login first!"})
        }

    }catch(err){
        res.status(400).send({"msg":err.msg})
    }
})

postRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization;
    const decoded=jwt.verify(token,"vinay")
    let payload=req.query;
    let page=1
    try{
        if(decoded){
            let userpage=(page-1)*3
            let post=await PostModel.find(payload).skip(userpage).limit(3)
            res.status(200).send(post)
        }else{
            res.status(400).send({"msg":"please login first!"})
        }

    }catch(err){
        res.status(400).send({"msg":err.msg})
    }
})

postRouter.patch("/update/:postID",async(req,res)=>{
    const token=req.headers.authorization;
    const decoded=jwt.verify(token,"vinay")
    let req_id=decoded.userID

    const {postID}=req.params;
    let user=await PostModel.findOne({_id:postID})
    let no_of_id=user.userID;
    let payload=req.body;
    try{
        if(req_id==no_of_id){
            await PostModel.findByIdAndUpdate({_id:postID},payload)
            res.status(200).send({"msg":"update successfully"})
        }else{
            res.status(400).send({"msg":"please login first!"})
        }

    }catch(err){
        res.status(400).send({"msg":err.msg})
    }
})

postRouter.delete("/delete/:postID",async(req,res)=>{
    const token=req.headers.authorization;
    const decoded=jwt.verify(token,"vinay")
    let req_id=decoded.userID

    const {postID}=req.params;
    let user=await PostModel.findOne({_id:postID})
    let no_of_id=user.userID;
    //let payload=req.body;
    try{
        if(req_id==no_of_id){
            await PostModel.findByIdAndDelete({_id:postID})
            res.status(200).send({"msg":"delete successfully"})
        }else{
            res.status(400).send({"msg":"please login first!"})
        }

    }catch(err){
        res.status(400).send({"msg":err.msg})
    }
})

module.exports={postRouter}
