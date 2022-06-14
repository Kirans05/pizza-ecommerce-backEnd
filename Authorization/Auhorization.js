require("dotenv").config()
const jwt = require("jsonwebtoken")
const Admin = require("../modal/AdminModel")
const User = require("../modal/usermodel")
const color = require("colors")



const protect = async (req,res,next) => {
    let tocken = req.headers.authorization 
    if(!tocken){
        res.json({message:"No Tocken Has been Sent"})
        return ;
    }

    if(req.headers.value == "user"){
        try{
            tocken = tocken.split(" ")[1]
            const decoded = await jwt.verify(tocken,process.env.Seceret_key)
            req.user = await User.findById({_id:decoded.id})
            next()
        }catch(error){
            res.json({message:"tocken Not Authorized"})
        }
    }else{
        if(tocken.startsWith("Bearer")){
            try{
                tocken = tocken.split(" ")[1]
                const decoded = await jwt.verify(tocken,process.env.Seceret_key)
                req.user = await Admin.findById({_id:decoded.id})
                next()
            }catch(error){
                res.json({message:"tocken Not Authorized"})
            }
        }
    }



}




module.exports = {protect}