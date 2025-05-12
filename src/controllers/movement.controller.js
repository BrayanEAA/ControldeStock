const Movement = require('../models/movement.model');
const Product = require('../models/product.model');

// Registrar movimiento (entrada o salida)
exports.createMovement = async (req, res) => {
    try {
        const { product, quantity, type } = req.body;

        const producto = await Product.findById(product);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Actualiza el stock según el tipo de movimiento
        if (type === 'entrada') {
            producto.stock += quantity;
        } else if (type === 'salida') {
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

exports.getMovementsByDate = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const movements = await Movement.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).populate('product', 'name'); // <- aquí es la clave

    res.json(movements);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los movimientos', error });
  }
};

  
  exports.getMovementsByProduct = async (req, res) => {
    const { productId } = req.params;
    try {
      const movements = await Movement.find({ product: productId }).populate('product'); // <-- Agrega .populate('product')
      res.json(movements);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los movimientos', error });
    }
  };
  
  // Obtener productos con stock bajo
  exports.getLowStockProducts = async (req, res) => {
    try {
      const lowStockProducts = await Product.find({ stock: { $lt: 10 } });
      res.json(lowStockProducts);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener productos con stock bajo', error });
    }
  };