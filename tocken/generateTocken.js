require("dotenv").config()
const jwt = require("jsonwebtoken")



const generateTocken = async (id) => {
    return await jwt.sign({id},process.env.Seceret_key,{expiresIn:"30d"})
}


module.exports = {generateTocken}