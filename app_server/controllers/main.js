const mongoose = require('mongoose');
const Product = mongoose.model('Product');

const home = (req, res) => {
	Product.find({"new": true}, function(err, products) {
		res.render('index', { title: 'Home', products: products });
	});
};

const product = (req, res) => {
	if(req.query.category === 'phone'){
		Product.find({"category": "phone"}, function(err, products) {
			res.render('product', { title: 'Điện thoại', products: products });
		});
	} else if (req.query.category === 'laptop') {
		Product.find({"category": "laptop"}, function(err, products) {
			res.render('product', { title: 'Laptop', products: products });
		});
	} else if (req.query.category === 'tablet') {
		Product.find({"category": "tablet"}, function(err, products) {
			res.render('product', { title: 'Tablet', products: products });
		});
	} else if (req.query.category === 'watch') {
		Product.find({"category": "watch"}, function(err, products) {
			res.render('product', { title: 'Đồng hồ', products: products });
		});
	} else if (req.query.source === 'apple') {
		Product.find({"source": "apple"}, function(err, products) {
			res.render('product', { title: 'Sản phẩm của Apple', products: products });
		});
	} else if (req.query.source === 'samsung') {
		Product.find({"source": "samsung"}, function(err, products) {
			res.render('product', { title: 'Sản phẩm của Samsung', products: products });
		});
	} else if (req.query.source === 'other') {
		Product.find({"source": "other"}, function(err, products) {
			res.render('product', { title: 'Sản phẩm của các hãng khác', products: products });
		});
	} else {
		Product.find( function(err, products) {
			res.render('product', { title: 'Tất cả sản phẩm', products: products });
		});
	}
};

module.exports = {
	home,
	product

}