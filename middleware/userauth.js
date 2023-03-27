const jwt=require("jsonwebtoken")

const userauth=(req,res,next)=>{
    const token=req.headers.authorization;
    const decoded=jwt.verify(token,"vinay")
    if(decoded){
        req.body.userID=decoded.userID
        next()
    }else{
        res.status(400).send({"msg":"please login first"})
    }

}

module.exports={userauth}