const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movement.controller');

// Rutas de movimientos de stock
router.post('/', movementController.createMovement);
router.get('/', movementController.getAllMovements);
router.get('/type/:type', movementController.getMovementsByType); // entrada o salida
router.get('/movements/date', movementController.getMovementsByDate);
router.get('/product/:productId', movementController.getMovementsByProduct);
router.get('/low-stock', movementController.getLowStockProducts);
router.get('/date', movementController.getMovementsByDate);
module.exports = router;
