const Product = require('../models/product.model');
const mongoose = require('mongoose');

// Crear producto
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los productos con la categoría completa
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un producto por ID con su categoría
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('category');
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Filtrar productos por categoría y/o bajo stock
exports.filterProducts = async (req, res) => {
    const { category, lowStock, stockThreshold } = req.query;
    const filter = {};

    // Filtrar por categoría
    if (category) {
        if (mongoose.Types.ObjectId.isValid(category)) {
            filter.category = category;
        } else {
            return res.status(400).json({ message: 'ID de categoría no válido' });
        }
    }

    // Filtrar por stock bajo
    if (lowStock === 'true') {
        const threshold = parseInt(stockThreshold) || 10; // Valor por defecto si no se indica
        filter.stock = { $lte: threshold };
    }

    try {
        const productos = await Product.find(filter).populate('category');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: 'Error al filtrar productos', error });
    }
};