require("dotenv").config()
const mongoose = require("mongoose")
let color = require("colors")


const conncetToDb = () => {
    mongoose.connect(process.env.URL).then((result) => console.log('mongoose connected'.bgBlue.red)).catch(()=>console.log("error connecteing to mongodb"))
}


module.exports = conncetToDb


