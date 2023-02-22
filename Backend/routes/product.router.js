const express = require("express");
const { productModel } = require("../models/products.model");
const { idvalidator } = require("../middlewares/idvalidator");


const productRouter = express.Router();

productRouter.get("/",async (req,res)=>{
    const data = await productModel.find();
    res.send(data);
})

// productRouter.get("/:id",async (req,res)=>{
//     const data = await productModel.find();
//     res.send(data);
// })

productRouter.post("/add",async (req,res)=>{
    const data = req.body;
    if(data.title && data.image && data.price && data.category){
        const token = req.headers.authorization;
        let product = productModel(data);
        await product.save();
        res.send({msg:"product added"});
    }
    else{
        res.send({msg:"please provide title, image, price and category"})
    }
});

// productRouter.use(idvalidator);

productRouter.get("/:id",idvalidator,async (req,res)=>{
    const id = req.params.id;
    const data = await productModel.findById(id);
    res.send(data);
})
// productRouter.use("/update/:id",idvalidator)

productRouter.patch("/update/:id",idvalidator,async (req,res)=>{
    let id = req.params.id;
    const update = req.body;
    try {
        await productModel.findByIdAndUpdate(id,update);
        res.send({msg:"updation sucessful"});
    }
    catch (error) {
        console.log(error);
        res.send({msg:"something went wrong"})
    }
})

// productRouter.use("/delete/:id",idvalidator)

productRouter.delete("/delete/:id",idvalidator,async (req,res)=>{
    let id = req.params.id;
    try {
        await productModel.findByIdAndDelete(id);
        res.send({msg:"deletion sucessful"});
    }
    catch (error) {
        console.log(error);
        res.send({msg:"something went wrong"})
    }
})

module.exports = {
    productRouter
}