const mongoose = require('mongoose');
const Product = mongoose.model('Product');

const home = (req, res) => {
	Product.find({"new": true}, function(err, products) {
		res.render('index', { title: 'Home', products: products });
	});
};

const checkout = (req, res) => {
	res.render('checkout', { title: 'Thanh toán' });
};

const history = (req, res) => {
	res.render('history', { title: 'Lịch sử' });
};

const search = (req, res) => {
	res.render('search', { title: 'Tìm kiếm' });
};

const profile = (req, res) => {
	res.render('profile', { title: 'Hồ sơ' });
};

const contact = (req, res) => {
	res.render('contact', { title: 'Liên hệ' });
};

const about = (req, res) => {
	res.render('about', { title: 'About Us' });
};

const privacy = (req, res) => {
	res.render('privacy', { title: 'Riêng tư' });
};

const terms = (req, res) => {
	res.render('terms', { title: 'Chính sách' });
};

const help = (req, res) => {
	res.render('help', { title: 'Hỗ trợ' });
};

const faqs = (req, res) => {
	res.render('faqs', { title: 'FAQS' });
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
