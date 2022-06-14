const colors = require("colors")
const express = require("express")
const PizzaModal = require("../modal/PizzaProduct")




const AddNewProduct = async (req,res) => {
    try{
        let insertProduct = await PizzaModal.create(req.body)
        res.status(200).json({message:"New Product Added SuccessFully",result:insertProduct})
    }catch(error){
        res.json({message:"Unable To Add Product"})
    }
}



const fetchllPizza = async (req,res) => {
    try{
        let fullData = await PizzaModal.find({})
        res.status(200).json({message:"SuccessFully Fetched Data",result:fullData})
    }catch(error){
        res.json({message:"unbale to Get the Pizzas Data"})
    }
}



const SingleProduct = async (req,res) => {
    try {
        let productdetails = await PizzaModal.find({_id:req.params.id})
        res.status(200).json({message:"Successfully Found The Product",result:productdetails})
    } catch (error) {
        res.json({message:"Error while Retrieving The Data"})
    }
}


const updateProduct = async (req,res) => {
    try {
        let updatePizza = await PizzaModal.updateOne({_id:req.body._id},{$set:req.body})
        res.status(200).json({message:"Pizza Updated SuccessFully",result:updatePizza})
    } catch (error) {
        res.json({message:"Unable To Update The pizza"})
    }
}


const deleteProduct = async (req,res) => {
    try {
        let deleteSingleProduct = await PizzaModal.deleteOne({_id:req.params.id})
        res.status(200).json({message:"Product delete SuccessFully",result:deleteSingleProduct})
    } catch (error) {
        res.json({message:"Unable To delete the product"})
    }
}



module.exports = {AddNewProduct, fetchllPizza , SingleProduct, updateProduct, deleteProduct}