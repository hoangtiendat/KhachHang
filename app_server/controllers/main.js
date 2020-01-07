const mongoose = require('mongoose');
const Product = require('../models/product');
const passport = require('passport');
const User = require('../models/user');
const constant = require('../Utils/constant');
const Cart = require('../models/cart');
const Bill = require('../models/bill');

const home = async (req, res) => {
	const products = await Product.getAllProduct({new: true}, {createdDate: -1});
	products.forEach((product) => {
		product.firstImageUrl = product.urlImage.split(constant.urlImageSeperator)[0];
	});
	res.render('index', {
		title: 'Trang chủ',
		products: products,
	});
};

const checkoutPage = (req, res, next) => {
	if (req.user != null) { 
		if (!req.session.cart) {
	    return res.render('checkout', {
	      title: 'Thanh toán',
	      user: req.user
	      // products: null
	    });
	  	}
	  	var cart = new Cart(req.session.cart);
	  	res.render('checkout', {
	    	title: 'Thanh toán',
	    	products: cart.getItems(),
	    	totalPrice: cart.totalPrice,
	    	user: req.user
	  	});
	} else {
		res.redirect('/login');
	}
};

const checkout = async (req, res, next) => {
	const cart = new Cart(req.session.cart);
	const buyer = req.user;
	console.log(cart);
	console.log(buyer);
	let info = {
	buyerId: buyer.userId,
	receiverName: req.body.name,
	phone: req.body.phone,
	email: req.body.email,
	address: req.body.address,
	city: req.body.city,
	description: req.body.description
	}
	const result = await Bill.addBill(cart, info);
	if (result){
        //Success
        req.session.cart = '';
        res.redirect('/');
    } else {
        //Fail
        res.redirect('/checkout');
    }
};

const removeCard = (req, res, next) => {
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart : {});

	cart.remove(productId);
	req.session.cart = cart;
	res.redirect('/checkout');
};

const history = (req, res) => {
	res.render('history', {
		title: 'Lịch sử',
	});
};

const search = (req, res) => {
	res.render('search', {
		title: 'Tìm kiếm',
	});
};

const contact = (req, res) => {
	res.render('contact', {
		title: 'Liên hệ',
	});
};

const about = (req, res) => {
	res.render('about', {
		title: 'About Us',
	});
};

const privacy = (req, res) => {
	res.render('privacy', {
		title: 'Riêng tư',
	});
};

const terms = (req, res) => {
	res.render('terms', {
		title: 'Chính sách',
	});
};

const help = (req, res) => {
	res.render('help', {
		title: 'Hỗ trợ',
	});
};

const faqs = (req, res) => {
	res.render('faqs', {
		title: 'FAQS',
	});
};

module.exports = {
	home,
	checkoutPage,
	checkout,
	history,
	search,
	contact,
	about,
	privacy,
	terms,
	help,
	faqs,
	removeCard
};
