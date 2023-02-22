const { productModel } = require("../models/products.model");

const idvalidator = async (req,res,next)=>{
    let id = req.params.id;
    if(id.length !== 24){
        res.send({msg:"invalid product id"});
        return;
    }
    try {
        const product = await productModel.findById(id);
        if(product){
            next();
        }
        else{
            res.send({msg:"product does not exist"});
        }
    } catch (error) {
        console.log("mongo: findById error");
        console.log(error);
        res.send({msg:"invaliid product id"});
    }
    
}

module.exports = {
    idvalidator
}