const fs = require("fs");
const file = JSON.parse(fs.readFileSync("data.json", 'utf-8'));
const model = require('../model/productSchema');
const Product = model.Product;

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const result = await product.save()
        return res.status(201).json({ message: 'success' })
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
    try {
        const result = await Product.findOneAndReplace({ _id: id }, req.body, { new: true })
        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    // const prdIndex = products.findIndex(p => p.id == (+id));
    // const product = products[prdIndex];
    // product.splice(prdIndex, 1, { ...product, ...req.body })
    // res.send(req.body);

    try {
        const result = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true })
        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).json(error);
    }
}

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    // const prdIndex = products.findIndex(p => p.id == (+id));
    // console.log(prdIndex);
    // products.splice(prdIndex, 1)
    // res.status(201).json("Product Deleted");

    try {
        const result = await Product.findByIdAndDelete(id)
        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).json(error);
    }
}