const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const movementRoutes = require('./routes/movement.routes');

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/movements', movementRoutes);

module.exports = app;
