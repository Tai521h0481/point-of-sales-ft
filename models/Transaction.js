const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, default: 1 },
        unitPrice: Number
    }],
    totalAmount: Number,
    customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
    salesperson: { type: Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
