const Category = require('../models/category.model');

// Crear categoría
exports.createCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las categorías
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener categoría por ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar categoría
exports.updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
        res.json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar categoría
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
        res.json({ message: 'Categoría eliminada' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
