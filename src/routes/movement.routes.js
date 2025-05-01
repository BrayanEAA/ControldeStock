const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movement.controller');

// Rutas de movimientos de stock
router.post('/', movementController.createMovement);
router.get('/', movementController.getAllMovements);
router.get('/type/:type', movementController.getMovementsByType); // entrada o salida

module.exports = router;
