const Admin = require("../modal/AdminModel")
const { generateTocken } = require("../tocken/generateTocken")
const PizzaModal = require("../modal/PizzaProduct")
const User = require("../modal/usermodel")



const AdminSignUp = async (req,res) => {
    let AdminUser = await Admin.findOne({email:req.body.email})
    if(AdminUser){
        res.status(400).json({message:"Admin Already Exists"})
    }else{
        let insertAdminData = await Admin(req.body)
        let result = await insertAdminData.save()
        let tocken = await generateTocken(result._id)
        res.status(200).json({message:"SignUp SuccessFull",result,tocken})
    }
}


const AdminLogin = async (req,res) => {
    let AdminUser = await Admin.findOne({email:req.body.email})
    if(AdminUser){
        let comparedResult = await AdminUser.matchPassword(req.body.password)
        if(comparedResult){
            let tocken = await generateTocken(AdminUser._id)
            res.status(200).json({message:"login SuccessFull",tocken,AdminUser})
        }else{
            res.status(400).json({message:"Password does Not Match"})
        }
    }else{
        res.status(400).json({message:"User Not found Please SignUp"})
    }
}

const AddProduct = async (req,res) => {
    try{
        let insertNewProduct = await PizzaModal.create(req.body)
        res.status(200).json({result:insertNewProduct,message:"Product Add"})
    }catch(error){
        res.json({message:"Unable to add product"})
    }    

}


const fetchAllUsers = async (req,res) => {
    try{
        let allUsers = await User.find({})
        res.status(200).json({message:"SuccessFully Fetched All Users",result:allUsers})
    }catch(error){
        res.json({message:"Unable To Display The Users Details"})
    }
}



module.exports = {AdminSignUp,AdminLogin, AddProduct, fetchAllUsers}