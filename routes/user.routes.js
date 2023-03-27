const express=require("express")
const {UserModel}=require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married}=req.body;
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(hash){
                let user=new UserModel({name,email,gender,password:hash,age,city,is_married})
                await user.save()
                res.status(200).send({"msg":"register successfull!"})
            }else{
                res.status(400).send({"msg":"register failed!"})
            }
        })

    }catch(err){
        res.status(400).send({"msg":err.msg})
    }

})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    let user=await UserModel.findOne({email})
    try{
        if(user){
            bcrypt.compare(password, user.password,async(err, result)=> {
                if(result){
                    res.status(200).send({"msg":"login successful!",token:jwt.sign({ "userID":user._id}, "vinay")})
                }else{
                    res.status(400).send({"msg":"login failed"})
                }
                // result == true
            });
        }

    }catch(err){
        res.status(400).send({"msg":err.msg})
    }

})

module.exports={userRouter}