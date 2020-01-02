const mongoose = require('mongoose');
const Product = require('../models/product');
const passport = require('passport');
const User = require('../models/user');
const constant = require('../Utils/constant');

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

const checkout = (req, res) => {
	res.render('checkout', {
		title: 'Thanh toán',
	});
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

// const profilePage = (req, res) => {
// 	res.render('profile', {
// 		title: 'Hồ sơ',
// 		user: (req.isAuthenticated) ? req.user : null
// 	});
// };
// const profile = async (req, res) => {
//     if (!req.isAuthenticated()){
//         res.redirect('/login');
//     } else {
//         try {
//             const info = {
//                 firstName: req.body.firstName || "",
//                 lastName: req.body.lastName || "",
//                 gender: req.body.gender || "",
//                 email: req.body.email || "",
//                 birthDate: req.body.birthDate || "",
//                 phone: req.body.phone || "",
//                 address: req.body.address || "",
//                 city: req.body.city || "",
//             };
//             const user = await User.setUserInfo(req.user.userId, info);
//             if (user) {
//                 res.redirect('/profile');
//             } else {
//                 const user = await User.getUser(req.user.userId);
//                 const cities = await Param.getAllCity();
//                 res.render('edit_profile', {
//                     title: 'Hồ sơ',
//                     user: Object.assign({}, user._doc, {
//                         birthDate: (user.birthDate)? user.birthDate.toString() : "",
//                         createdDate: user.createdDate.toString(),
//                         error_message: "Cập nhật thông tin thất bại"
//                     }),
//                     cities: cities
//                 });
//             }

//         } catch(err) {
//             console.log('err', err);
//         }
//     }
// };

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
	checkout,
	history,
	search,
	contact,
	about,
	privacy,
	terms,
	help,
	faqs
};
