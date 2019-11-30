const mongoose = require('mongoose');

const loginPage = (req, res) => {
    res.render('login', {
        title: 'Đăng nhập',
        layout: false ,
        user: (req.isAuthenticated) ? req.user : null,
        error_message: (req.query.error_message)? req.query.error_message : null
    });
}
const login = (req, res) => {
    res.redirect('index', {
        title: 'Trang chủ',
        user: (req.isAuthenticated) ? req.user : null
    });
}
module.exports = {
    loginPage,
    login
}
