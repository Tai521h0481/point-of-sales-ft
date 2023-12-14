const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    const {name, image, importPrice, retailPrice, category} = req.body
    console.log(req.body);
    // try {
    //     const barcode = `${name.replace(' ', '_')}_${category}_${Date.now()}`;
    //     const product = await Product.create({name, image, importPrice, retailPrice, category, barcode});
    //     res.status(201).json(product);
    // } catch (error) {
    //     res.status(500).json({error : error.message});
    // }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.listProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
};
