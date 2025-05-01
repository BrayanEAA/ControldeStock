const Movement = require('../models/movement.model');
const Product = require('../models/product.model');

// Registrar movimiento (entrada o salida)
exports.createMovement = async (req, res) => {
    try {
        const { product, quantity, type } = req.body;

        if (!['entrada', 'salida'].includes(type)) {
            return res.status(400).json({ message: 'Tipo de movimiento inválido. Debe ser "entrada" o "salida".' });
        }

        const producto = await Product.findById(product);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Actualiza el stock según el tipo de movimiento
        if (type === 'entrada') {
            producto.stock += quantity;
        } else {
            if (producto.stock < quantity) {
                return res.status(400).json({ message: 'Stock insuficiente para realizar la salida' });
            }
            producto.stock -= quantity;
        }

        await producto.save();

        const movimiento = new Movement(req.body);
        await movimiento.save();

        res.status(201).json({ movimiento, nuevoStock: producto.stock });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener historial completo
exports.getAllMovements = async (req, res) => {
    try {
        const movimientos = await Movement.find().populate('product');
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Filtrar por tipo de movimiento
exports.getMovementsByType = async (req, res) => {
    try {
        const { type } = req.params;
        const movimientos = await Movement.find({ type }).populate('product');
        res.json(movimientos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
