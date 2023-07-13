const model = require('../model/userSchema');
const User = model.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const token = jwt.sign({ email: req.body.email }, 'shhhhh');
        user.token = token;
        const hash = bcrypt.hashSync(user.password, saltRounds);
        user.password = hash;
        const result = await user.save();
        return res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(403).json({ error: 'User already exists' });
        } else {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

exports.loginUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const doc = await User.findOne({ email: req.body.email });
        const isAuth = bcrypt.compareSync(req.body.password, doc.password);
        if (isAuth) {
            var token = jwt.sign({ email: req.body.email }, 'shhhhh', { expiresIn: 60 * 60 });
            doc.token = token;
            await doc.save();
            return res.json({ token });
        } else {
            return res.sendStatus(401);
        }
    } catch (error) {
        return res.status(404).json({ error: 'User not found' });
    }
}