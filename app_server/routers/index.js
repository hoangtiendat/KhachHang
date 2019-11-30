var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');
const productCtrl = require('../controllers/product');

/* GET Home page. */
router.get('/', ctrlMain.home);

/* GET all Products page. */
router.get('/product', productCtrl.product);
router.post('/product', productCtrl.product);

/* GET item Detail page. */
router.get('/item_detail', productCtrl.productDetail);

router.get('/checkout', ctrlMain.checkout);

router.post('/checkout', ctrlMain.checkout);

router.get('/history', ctrlMain.history);

router.get('/search', ctrlMain.search);

router.post('/search', ctrlMain.search);

router.get('/profile', ctrlMain.profile);

router.post('/profile', ctrlMain.profile);

router.get('/contact', ctrlMain.contact);

router.get('/about', ctrlMain.about);

router.get('/privacy', ctrlMain.privacy);

router.get('/terms', ctrlMain.terms);

router.get('/help', ctrlMain.help);

router.get('/faqs', ctrlMain.faqs);

module.exports = router;
