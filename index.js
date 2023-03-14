const productController = require('./controller/product');
const express = require('express');
const server = express();
const router = express.Router();

// **** Middleware Routing ****
server.use('/products', router);

// ****Middleware****
server.use((req, res, next) => {
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
router.put('/:id', productController.updateProduct); //Replace all properties of product

// Update PATCH /product/:id
router.patch('/:id', productController.replaceProduct); //Replace certain properties, rest keeps same

//Delete DELETE /product/:id
router.delete('/:id', productController.deleteProduct);

server.listen(8080, () => {
    console.log('server started');
});