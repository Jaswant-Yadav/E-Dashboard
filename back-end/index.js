const express = require("express");
const cors = require('cors');
require('./db/config');
const User = require('./db/user');
const Product = require("./db/Products");
const app = express();

const Jwt = require('jsonwebtoken');
const JwtKey = 'e-commerce';

app.use(cors());
app.use(express.json());

app.post('/register', async (req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({ result }, JwtKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong, Please try after some time..." })
        }
        resp.send({ result, auth: token })
    })
});

app.post('/login', async (req, resp) => {

    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, JwtKey, { expiresIn: "1h" }, (err, token) => {
                if (err) {
                    resp.send({ result: "Something went wrong, Please try after some time..." })
                }
                resp.send({ user, auth: token })
            })

        } else {
            resp.send({ result: "No user found" })
        }
    }
});

app.post('/add-product', verifyToken, async (req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

app.get('/products',  verifyToken,async (req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products)
    } else {
        resp.send({ result: "No product found" })
    }
});

app.delete('/products/:id', verifyToken, async (req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    resp.send(result);
});

app.get('/products/:id', verifyToken, async (req, resp) => {
    console.log(req.params.id.trim());
    let results = await Product.findOne({ _id: req.params.id.trim() })
    if (results) {
        resp.send(results);
    } else {
        resp.send({ result: "No Record found" })
    }
});

app.put('/products/:id', verifyToken, async (req, resp) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    resp.send(result);
});

app.get("/search/:key", verifyToken, async (req, resp) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    })
    resp.send(result);
});

function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        token = token.split(' ')[1];
        Jwt.verify(token, JwtKey, (error, valid) => {
            if (error) {
                return resp.status(401).send({ result: "Please provide valid token" });
            } else {
                next();
            }
        });
    } else {
        return resp.status(403).send({ result: "Please add token with header" });
    }
}


app.listen(5000);