require('dotenv').config()
const productController = require('./controller/product');
const express = require('express');
const server = express();
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

async function main() {
	await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
}
main().catch(err=>console.log(err));

// Body Parser
server.use(cors());
server.use(express.json());

server.use(express.static(process.env.PUBLIC_DIR));
// **** Middleware Routing ****
server.use('/products', router);
server.use('*', (req,res)=> {
    res.sendFile(path.resolve(__dirname,'build','index.html'));
})

// ****Middleware****
server.use((req, res, next) => {
    Object.keys(req.body).forEach(key => {
        delete req.body[key];
      });
    next();
});

// ***** API or Endpoints or Routes *****
// Create POST /product
router.post('/', productController.createProduct);

// Read GET /products
router.get('/', productController.getAllProducts)

// Read GET /product/:id
router.get('/:id', productController.getProduct);

// Update PUT /product/:id
router.put('/:id', productController.replaceProduct); //Replace all properties of product

// Update PATCH /product/:id
router.patch('/:id', productController.updateProduct); //Replace with req.body properties, rest keeps same

// Delete DELETE /product/:id
router.delete('/:id', productController.deleteProduct);

server.listen(8080, () => {
    console.log('server started');
});