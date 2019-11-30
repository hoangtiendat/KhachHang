const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const passport = require('passport');

const home = (req, res) => {
	Product.find({"new": true}, function(err, products) {
		res.render('index', {
			title: 'Home',
			products: products,
			user: (req.isAuthenticated) ? req.user : null
		});
	});
};

const checkout = (req, res) => {
	res.render('checkout', {
		title: 'Thanh toán',
		user: (req.isAuthenticated) ? req.user : null
	});
};

const history = (req, res) => {
	res.render('history', {
		title: 'Lịch sử',
		user: (req.isAuthenticated) ? req.user : null
	});
};

const search = (req, res) => {
	res.render('search', {
		title: 'Tìm kiếm',
		user: (req.isAuthenticated) ? req.user : null
	});
};

const profile = (req, res) => {
	res.render('profile', {
		title: 'Hồ sơ',
		user: (req.isAuthenticated) ? req.user : null
	});
};

const contact = (req, res) => {
	res.render('contact', {
		title: 'Liên hệ',
		user: (req.isAuthenticated) ? req.user : null
	});
};

const about = (req, res) => {
	res.render('about', {
		title: 'About Us',
		user: (req.isAuthenticated) ? req.user : null
	});
};

const privacy = (req, res) => {
	res.render('privacy', {
		title: 'Riêng tư',
		user: (req.isAuthenticated) ? req.user : null
	});
};

const terms = (req, res) => {
	res.render('terms', {
		title: 'Chính sách',
		user: (req.isAuthenticated) ? req.user : null
	});
};

const help = (req, res) => {
	res.render('help', {
		title: 'Hỗ trợ',
		user: (req.isAuthenticated) ? req.user : null
	});
};

const faqs = (req, res) => {
	res.render('faqs', {
		title: 'FAQS',
		user: (req.isAuthenticated) ? req.user : null
	});
};

module.exports = {
	home,
	checkout,
	history,
	search,
	profile,
	contact,
	about,
	privacy,
	terms,
	help,
	faqs
};
