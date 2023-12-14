const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
    try {
        const transaction = new Transaction(req.body);
        await transaction.save();
        res.status(201).send(transaction);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.transactionId).populate('products.product');
        if (!transaction) {
            return res.status(404).send();
        }
        res.send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.listTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({}).populate('products.product');
        res.send(transactions);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.transactionId, req.body, { new: true, runValidators: true });
        if (!transaction) {
            return res.status(404).send();
        }
        res.send(transaction);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndDelete(req.params.transactionId);
        if (!transaction) {
            return res.status(404).send();
        }
        res.send(transaction);
    } catch (error) {
        res.status(500).send(error);
    }
};
