require('dotenv').config()
const productController = require('./controller/product');
const userController = require('./controller/user');
const express = require('express');
const server = express();
const productRouter = express.Router();
const userRouter = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
}
main().catch(err => console.log(err));

// Body Parser
server.use(cors());
server.use(express.json());
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));

// ****Middleware****
const auth = ((req, res, next) => {
    const token = req.get('authorization');
    console.log(token);
    try {
        var decoded = jwt.verify(token, 'shhhhh');
        if(decoded.email) {
            next();
        } else {
            return res.status(401).json({ message: 'Authentication Error!!' });
        }
    } catch (error) {
        return res.status(401).json({ message: 'Authentication Error!' });
    }
});

// **** Middleware Routing ****
server.use('/api', userRouter);
server.use('/products', auth, productRouter);
server.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

// ***** API or Endpoints or Routes *****
// Create POST /product
userRouter.post('/signup', userController.createUser);
userRouter.post('/login', userController.loginUser);
productRouter.post('/', productController.createProduct);


// Read GET /products
productRouter.get('/', productController.getAllProducts)

// Read GET /product/:id
productRouter.get('/:id', productController.getProduct);

// Update PUT /product/:id
productRouter.put('/:id', productController.replaceProduct); //Replace all properties of product

// Update PATCH /product/:id
productRouter.patch('/:id', productController.updateProduct); //Replace with req.body properties, rest keeps same

// Delete DELETE /product/:id
productRouter.delete('/:id', productController.deleteProduct);

server.listen(8080, () => {
    console.log('server started');
});