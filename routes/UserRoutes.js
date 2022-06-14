const express = require("express")
const {UserProtect, protect} = require("../Authorization/Auhorization")
const router = express.Router()
const { userSignUp, loginUser, userPurchased, AddToCart, fetchCartItem, removeFromCart, ordrePizza, myOrders, fetchParticularUser } = require("../controllers/Usercontrollers")


router.route("/").post(userSignUp)
router.route("/login").post(loginUser)
router.route("/addToCart").post(protect,AddToCart)
router.route("/fetchCartItem").get(protect,fetchCartItem)
router.route("/removeFromCart").post(protect,removeFromCart)
router.route("/ordrePizza").post(protect,ordrePizza)
router.route("/fetchMyOrders").get(protect,myOrders)
router.route("/singleUser").get(protect,fetchParticularUser)

module.exports = router