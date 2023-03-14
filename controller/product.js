const fs = require("fs");
const file = JSON.parse(fs.readFileSync("data.json", 'utf-8'));
const products = file.products;

exports.createProduct = (req,res) => {
    products.push(req.body)
    res.json(req.body);
}

exports.getAllProducts = (req, res) => {
    res.send(products);
}
exports.getProduct = (req, res) => {
    const id = +req.params.id
    const prd = products.find(p => p.id == (+id));
    res.send(prd);
}

exports.replaceProduct = (req,res) => {
    const id = +req.params.id;
    const prdIndex = products.findIndex(p => p.id == (+id)); //Since, find gives only copy of product and we want
    products.splice(prdIndex,1,{id:id, ...req.body})        //to update existing product so we use splice.
    res.send(req.body);
}

exports.updateProduct = (req,res) => {
    const id = +req.params.id;
    const prdIndex = products.findIndex(p => p.id == (+id)); 
    const product = products[prdIndex];
    product.splice(prdIndex,1,{...product, ...req.body})        
    res.send(req.body);
}

exports.deleteProduct = (req,res) => {
    const id = +req.params.id;
    const prdIndex = products.findIndex(p => p.id == (+id)); 
    console.log(prdIndex);
    products.splice(prdIndex,1)        
    res.status(201).json("Product Deleted");
}