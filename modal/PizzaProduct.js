const mongoose = require("mongoose")


const PizzaProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    varients:[],
    prices:[],
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})



const PizzaModal = new mongoose.model("pizzaTable",PizzaProductSchema)


module.exports = PizzaModal