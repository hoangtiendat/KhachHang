var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/item_detail', function(req, res, next) {
  res.render('item_detail', { title: 'Sản phẩm' });
});

router.get('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Thanh toán' });
});

router.post('/checkout', function(req, res, next) {
  res.render('checkout', { title: 'Thanh toán' });
});

router.get('/history', function(req, res, next) {
  res.render('history', { title: 'Lịch sử' });
});

router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Tìm kiếm' });
});

router.post('/search', function(req, res, next) {
  res.render('search', { title: 'Tìm kiếm' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About Us' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Liên hệ' });
});

router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'Hồ sơ' });
});

router.post('/profile', function(req, res, next) {
  res.render('profile', { title: 'Hồ sơ' });
});

router.get('/product', function(req, res, next) {
  res.render('product', { title: 'Sản phẩm' });
});

router.post('/product', function(req, res, next) {
  res.render('product', { title: 'Sản phẩm' });
});

router.get('/privacy', function(req, res, next) {
  res.render('privacy', { title: 'Riêng tư' });
});

router.get('/terms', function(req, res, next) {
  res.render('terms', { title: 'Chính sách' });
});

router.get('/help', function(req, res, next) {
  res.render('help', { title: 'Hỗ trợ' });
});

router.get('/faqs', function(req, res, next) {
  res.render('faqs', { title: 'FAQS' });
});
module.exports = router;
