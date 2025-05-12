const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

// Primero las rutas más específicas
router.get('/filter', productController.filterProducts); // Primero esto

// CRUD
router.post('/', productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
