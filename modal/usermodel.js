const bcryyptjs = require("bcryptjs")
const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://static.thenounproject.com/png/642902-200.png"
    },
    orders:[],
    cartItem:[]
},{timestamps:true})


userSchema.methods.matchPassword = async function(pwd){
    return await bcryyptjs.compare(pwd,this.password)
}  



userSchema.pre("save",async function(next){
    if(!this.isModified){
        next()
    }

    let salt = await bcryyptjs.genSalt(10)
    this.password = await bcryyptjs.hash(this.password, salt)
})


const User = new mongoose.model("userdata",userSchema)

module.exports = User