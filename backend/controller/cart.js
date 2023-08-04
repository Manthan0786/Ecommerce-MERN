const modal = require('../model/userSchema');
const model = require('../model/productSchema');
const User = modal.User;
const Product = model.Product;

exports.addToCart = async (req, res) => {
    try {
        const token = req.get('authorization').split('Bearer ')[1];
        const user = await User.findOne({ token });
        const prodID = req.params.id;
        if (user.cart.includes(prodID)) {
            return res.status(409).json({ message: 'Product already in the cart' });
        } else {
            user.cart.push(prodID);
            await user.save();
            return res.status(200).json({ message: 'Product added sucessfully!' })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.getCartProducts = async (req, res) => {
    try {
        const token = req.get('authorization').split('Bearer ')[1];
        const user = await User.findOne({ token });
        if (user.cart !== 'null') {
            const product = user.cart;
            const products = product.map(async (p) => {
                const res = await Product.findById(p.toString()).exec();
                return res;
            })
            Promise.all(products).then((result) => {
                return res.send(result);
            })
        } else {
            return res.json({ message: 'Cart is empty!' })
        }
    } catch (error) {
        return res.send(500);
    }
}

exports.deleteProductFromCart = async(req, res) => {
    try {
        const token = req.get('authorization').split('Bearer ')[1];
        const user = await User.findOne({ token });
        const id = req.params.id;
        if(user.cart !== 'null') {
            const index = user.cart.indexOf(id);
            user.cart.splice(index, 1)
            await user.save();
            const updatedCart = user.cart;
            return res.send(updatedCart);
        }
    } catch (error) {
        return res.send(error).json({message: 'Not deleted!'});
    }
}

