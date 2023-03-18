const fs = require("fs");
const file = JSON.parse(fs.readFileSync("data.json", 'utf-8'));
const model = require('../model/productSchema');
const Product = model.Product;

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const result = await product.save()
        return res.status(201).json({message: 'success'})
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.getAllProducts = async (req, res) => {
    const result = await Product.find();
    res.send(result);
}
exports.getProduct = async (req, res) => {
    const id = req.params.id;
    const result = await Product.findById(id)
    res.send(result);
}

exports.replaceProduct = async (req, res) => {
    const id = req.params.id;
    // const prdIndex = products.findIndex(p => p.id == (+id)); //Since, find gives only copy of product and we want
    // products.splice(prdIndex, 1, { id: id, ...req.body })        //to update existing product so we use splice.
    const result = await Product.findOneAndReplace(id)
    res.send(result);
}

exports.updateProduct = (req, res) => {
    const id = req.params.id;
    const prdIndex = products.findIndex(p => p.id == (+id));
    const product = products[prdIndex];
    product.splice(prdIndex, 1, { ...product, ...req.body })
    res.send(req.body);
}

exports.deleteProduct = (req, res) => {
    const id = +req.params.id;
    const prdIndex = products.findIndex(p => p.id == (+id));
    console.log(prdIndex);
    products.splice(prdIndex, 1)
    res.status(201).json("Product Deleted");
}