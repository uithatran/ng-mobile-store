const express = require('express');
const controller = require('../controllers/customer.controller');
const router = express.Router();
const productModel = require('../models/product.model');

// app.use('/api/products', productRoutes);
router.get('/', controller.getProducts);
 
router.post('/', controller.postProduct);

router.get('/:productId', controller.getProduct);

module.exports = router;

