  
const express = require('express');
const router = express.Router();
const ctrlProduct = require('../controllers/product');

// locations
router.get('/product', ctrlProduct.productsList)
router.post('/product', ctrlProduct.productsCreate);
module.exports = router;