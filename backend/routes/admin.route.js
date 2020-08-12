const express = require('express');
const multer = require('multer');

const router = express.Router();
// let upload = multer({ dest: 'public/uploads' });
var upload = multer({ dest: 'public/uploads/' });

const userModel = require('../models/user.model');
const controller = require('../controllers/admin.controller');

// app.use('/api/admin', checkAuth, adminRoutes);
router.get('/products', controller.getProducts);
router.post('/product-add', upload.single('imageFile'), controller.postProduct);
router.delete('/product/:productId', controller.deleteProduct);

router.get('/users', controller.getUsers);
router.post('/users', controller.postUsers);
router.delete('/users/:userId', controller.deleteUser);

module.exports = router;