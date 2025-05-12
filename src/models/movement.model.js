const mongoose = require('mongoose');

const movementSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    type: { type: String, enum: ['entrada', 'salida'], required: true }, // entrada o salida
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    note: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Movement', movementSchema);