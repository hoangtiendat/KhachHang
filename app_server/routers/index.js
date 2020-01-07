const express = require('express');
const router = express.Router();
const passport = require('passport');
const ctrlMain = require('../controllers/main');
const accountCtrl = require('../controllers/account');
const productCtrl = require('../controllers/product');
const userCtrl = require('../controllers/user');
const billCtrl = require('../controllers/bill');
require('./passport');

/* GET Home page. */
router.get('/', ctrlMain.home);

/* GET Login page. */
router.get('/login', accountCtrl.loginPage);
router.post('/login', function(req, res, next){
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { 
            req.flash('error', info.message);
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

router.get('/checkout', ctrlMain.checkoutPage);

router.post('/checkout', ctrlMain.checkout);

router.get('/history', billCtrl.bills);

router.get('/bill_detail/:billId', billCtrl.bill_detail);

router.get('/search', productCtrl.search);

router.get('/advancedSearch', productCtrl.advancedSearch);

router.get('/advancedSearchResult', productCtrl.advancedSearchResult);

router.get('/profile', userCtrl.profile)

router.get('/edit_profile', userCtrl.editProfilePage);

router.post('/edit_profile', userCtrl.editProfile);

router.get('/contact', ctrlMain.contact);

router.get('/about', ctrlMain.about);

router.get('/privacy', ctrlMain.privacy);

router.get('/terms', ctrlMain.terms);

router.get('/help', ctrlMain.help);

router.get('/faqs', ctrlMain.faqs);

router.get('/add/:id', productCtrl.cart);


router.get('/remove/:id', ctrlMain.removeCard);


router.post('/comment/:id', productCtrl.comment);

module.exports = router;
