const express = require('express');
const router = express.Router();
const passport = require('passport');
const ctrlMain = require('../controllers/main');
const accountCtrl = require('../controllers/account');
const productCtrl = require('../controllers/product');
require('./passport');


/* GET Home page. */
router.get('/', ctrlMain.home);

/* GET Login page. */
router.get('/login', accountCtrl.loginPage);
router.post('/login', function(req, res, next){
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login') }
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

router.get('/source/:source', productCtrl.product);

router.get('/verify', accountCtrl.verify);
router.post('/verify/', accountCtrl.verify);

router.get('/product', productCtrl.product);
router.post('/product/', productCtrl.product);

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
