const express = require("express");
const { ProductModel } = require("../models/Products.model");
const { ProducFiltertModel } = require("../models/productFilter.model");
const { idvalidator } = require("../middlewares/idvalidator");
const { authentication } = require('../middlewares/Authentication.middleware')


const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
    try {
        const data = await ProductModel.find();
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

productRouter.post("/add", authentication, async (req, res) => {
    const payload = req.body;
    try {
        const product = new ProductModel(payload)
        await product.save()
        res.send({ message: "Product added" });
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
});
productRouter.get("/filters", async (req, res) => {
    let product=req.query;
    try {
        const data = await ProducFiltertModel.findOne(product);
        res.send(data);
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

productRouter.post("/filters/add", authentication, async (req, res) => {
    const payload = req.body;
    try {
        const product = new ProducFiltertModel(payload)
        await product.save()
        res.send({ message: "Product Filters are added" });
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
});


productRouter.get('/search', async (req, res) => {
    const types = req.query.types;
    const category = req.query.category;
    const payload= req.query
    // console.log(payload)
    if (types && category) {
    //     let description = payload.description.toLowerCase();
        try {
            // const products = await ProductModel.find({ description: { $regex: '(?i)' + description } });
            // const regexPattern = new RegExp(payload.pattern, "i");
            const products = await ProductModel.find({
                types: {
                  $elemMatch: {
                    $regex: new RegExp(types, "i")
                  },
                },
                 category: { $regex: '(?i)' + category }  
              });
            return res.send(products)
        } catch (error) {
            return res.send({ message: error.message })
        }
    }
    if(types){
        try {
            // const products = await ProductModel.find({ description: { $regex: '(?i)' + description } });
            // const regexPattern = new RegExp(payload.pattern, "i");
            const products = await ProductModel.find({
                types: {
                  $elemMatch: {
                    $regex: new RegExp(types, "i")
                  },
                },
              });
            return res.send(products)
        } catch (error) {
            return res.send({ message: error.message })
        }
    }
    try {
        const products = await ProductModel.find(payload)
        res.send(products)  
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})


productRouter.get("/:id", idvalidator, async (req, res) => {
    const id = req.params['id'];
    try {
        const product = await ProductModel.findOne({ _id: id })
        res.send(product)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})


productRouter.put("/update/:id", authentication, idvalidator, async (req, res) => {
    let id = req.params.id;
    const update = req.body;
    try {
        await ProductModel.findByIdAndUpdate(id, update);
        res.send({ message: "Product Updated Sucessfully" });
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
})

productRouter.delete("/delete/:id", authentication, idvalidator, async (req, res) => {
    let id = req.params.id;
    try {
        await ProductModel.findByIdAndDelete(id);
        res.send({ message: "Product Removed Sucessfully" });
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
})

module.exports = {
    productRouter
}