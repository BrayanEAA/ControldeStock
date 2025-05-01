const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    stock: { type: Number, default: 0 },
    price: { type: Number, required: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
