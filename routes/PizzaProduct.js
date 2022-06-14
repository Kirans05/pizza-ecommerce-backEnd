const express = require("express")
const { protect } = require("../Authorization/Auhorization")
const { AddNewProduct, fetchllPizza, SingleProduct, updateProduct, deleteProduct } = require("../controllers/fetchAppProducts")
const router = express.Router()



router.route("/").post(protect,AddNewProduct)
router.route("/fetchAllPizza").get(protect,fetchllPizza)
router.route("/singleProduct/:id").get(protect,SingleProduct)
router.route("/updateProduct").post(protect,updateProduct)
router.route("/deleteProduct/:id").delete(protect,deleteProduct)


module.exports = router