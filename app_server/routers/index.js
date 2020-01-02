const express = require('express');
const router = express.Router();
const passport = require('passport');
const ctrlMain = require('../controllers/main');
const accountCtrl = require('../controllers/account');
const productCtrl = require('../controllers/product');
const userCtrl = require('../controllers/user');
require('./passport');

var Cart = require('../models/cart');
/* GET Home page. */
router.get('/', ctrlMain.home);

/* GET Login page. */
router.get('/login', accountCtrl.loginPage);
router.post('/login', function(req, res, next){
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { 
            req.flash('error', 'No user found.');
            res.redirect('/login');
            return; }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next)
});

/* GET Login page. */
router
.get('/signup', accountCtrl.signupPage);
router.post('/signup', accountCtrl.signup);

/* GET Home page. */
router.get('/logout', accountCtrl.logout);

/* GET all Products page. */
router
	.route('/category/:category')
	.get(productCtrl.product);

router.get('/brand/:brandId', productCtrl.product);

router.get('/verify', accountCtrl.verifyPage);
router.post('/verify', accountCtrl.verify);

router.get('/enterEmail', accountCtrl.emailPage);
router.post('/enterEmail', accountCtrl.email);

router.get('/pwdEmail', accountCtrl.pwdEmailPage);
router.post('/pwdEmail', accountCtrl.pwdEmail);

router.get('/changePwd', accountCtrl.changePwdPage);
router.post('/changePwd', accountCtrl.changePwd);

router.get('/product', productCtrl.product);
router.post('/product', productCtrl.product);

/* GET item Detail page. */
router.get('/item_detail/:productId', productCtrl.productDetail);

router.get('/checkout', ctrlMain.checkout);

router.post('/checkout', ctrlMain.checkout);

router.get('/history', ctrlMain.history);

router.get('/search', ctrlMain.search);

router.post('/search', ctrlMain.search);

router.get('/profile', userCtrl.profile)

router.get('/edit_profile', userCtrl.editProfilePage);

router.post('/edit_profile', userCtrl.editProfile);

router.get('/contact', ctrlMain.contact);

router.get('/about', ctrlMain.about);

router.get('/privacy', ctrlMain.privacy);

router.get('/terms', ctrlMain.terms);

router.get('/help', ctrlMain.help);

router.get('/faqs', ctrlMain.faqs);

var products = require('../models/product');
router.get('/add/:id', productCtrl.cart);

router.get('/cart', function(req, res, next) {
  if (!req.session.cart) {
    return res.render('cart', {
      // products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('cart', {
    title: 'NodeJS Shopping Cart',
    products: cart.getItems(),
    totalPrice: cart.totalPrice
  });
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.remove(productId);
  req.session.cart = cart;
  res.redirect('/cart');
});

module.exports = router;
