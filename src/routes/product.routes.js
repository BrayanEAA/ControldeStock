const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller'); // Asegúrate de que la ruta sea correcta

// Rutas CRUD de productos
router.post('/', productController.createProduct);  // Debe ser una función
router.get('/', productController.getAllProducts); // Debe ser una función
router.get('/:id', productController.getProductById); // Debe ser una función
router.put('/:id', productController.updateProduct); // Debe ser una función
router.delete('/:id', productController.deleteProduct); // Debe ser una función

module.exports = router;
