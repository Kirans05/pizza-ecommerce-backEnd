const User = require("../modal/usermodel")
const {generateTocken} = require("../tocken/generateTocken")

const userSignUp = async (req,res) => {

    const user = await User(req.body)
    if(user.length){
        res.status(400).json({message:"User Already Exists "})
    }else{
        try{
            let insertData = await User(req.body)
            const result = await insertData.save()
            const tocken = await generateTocken(result._id)
            res.status(200).json({message:"SignUp SuccessFull",result,tocken})
        }catch(error){
            console.log("error",error)
        }
    }
}



const loginUser = async (req,res) => {
    let user = await User.findOne({email:req.body.email})
    if(user){
        let comparedResult = await user.matchPassword(req.body.password)
        if(comparedResult){
            let tocken = await generateTocken(user._id)
            res.status(200).json({message:"Login SuccessFull",result:user,tocken})
        }else{
            res.status(400).json({message:"Password does Not MAtch"})
        }
    }else{
        res.status(400).json({message:"User Not Found "})
    }
}



const userPurchased = async (req,res) => {
    try{
        let purchasedProduct = await User.updateOne({_id:req.user._id},{$push:{orders:req.body}}) 
        res.status(200).json({message:"SuccessFully Updated",result:purchasedProduct})
        
    }catch(error){
        res.json({message:"unable to buy the Product"})
    }
}


const AddToCart = async (req,res) => {
    try{
            let findProduct = await User.find({_id:req.user._id})
            let ProductIn = findProduct[0].cartItem.filter(item => item._id == req.body._id)
            if(ProductIn.length){
                res.status(200).json({message:"Product Already Added To Cart"})
            }else{
                let AddtoCart = await User.updateOne({_id:req.user._id},{
                    $push:{cartItem:req.body}
                })
                res.status(200).json({message:"Item Added To Cart SuccessFully",result:AddtoCart})
            }
    }catch(error){
        res.json({message:"Unable to Add Product To Cart"})
    }
}


const fetchCartItem = async (req,res) => {
    try{
        let fullCartItem = await User.find({_id:req.user._id})
        res.status(200).json({message:"Successfully Fetched Cart Item",result:fullCartItem})
    }catch(error){
        res.json({message:"Unable To Fetch Cart Item"})
    }
}


const removeFromCart = async (req,res) => {
    try{
        let findUser = await User.findOne({_id:req.user._id})
        let {cartItem} = findUser
        let filterList = cartItem.filter(item => item._id != req.body._id)
        findUser.cartItem = filterList
        let updateData = await User.updateOne({_id:req.user._id},{$set:findUser})
        res.status(200).json({message:"SuccessFully removed from The Cart",result:updateData})
    }catch(error){
        res.json({message:"Unable To Remove from Cart"})
    }
}


const ordrePizza = async (req,res) => {
    try{
        let orderNewPizza = await User.updateOne({_id:req.user._id},{
            $push:{orders:req.body}
        },
        {new:true}
        )

        res.status(200).json({message:"Order SuccessFull",result:orderNewPizza})
    }catch(error){
        res.json({message:"Unable To order The Pizza"})
    }
}


const myOrders = async (req,res) => {
    try{
        let fetchOrders = await User.find({_id:req.user._id})
        res.status(200).json({message:"SuccessFully Rettrived My Ordres",result:fetchOrders})
    }catch(error){
        res.json({message:"Unable To Fetch Orders"})
    }
}


const fetchParticularUser = async (req,res) => {
    try{
        let singleUser = await User.find({_id:req.user._id})
        res.status(200).json({message:"Fetched UserData",result:singleUser})
        }catch(error){
        res.json({message:"Unable To Get The data"})
    }
}



module.exports = {userSignUp, loginUser, userPurchased,fetchParticularUser, AddToCart, fetchCartItem, removeFromCart, ordrePizza, myOrders}