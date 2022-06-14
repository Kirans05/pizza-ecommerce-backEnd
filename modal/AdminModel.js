const bcryyptjs = require("bcryptjs")
const mongoose = require("mongoose")


const AdminSchema = new mongoose.Schema({
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
    }
},{timestamps:true})


AdminSchema.methods.matchPassword = async function(pwd){
    return await bcryyptjs.compare(pwd,this.password)
}  



AdminSchema.pre("save",async function(next){
    if(!this.isModified){
        next()
    }

    let salt = await bcryyptjs.genSalt(10)
    this.password = await bcryyptjs.hash(this.password, salt)
})


const Admin = new mongoose.model("adminData",AdminSchema)

module.exports = Admin