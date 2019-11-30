const mongoose = require('mongoose');

const loginPage = (req, res) => {
    res.render('login', {
        title: 'Đăng nhập',
        layout: false ,
        user: (req.isAuthenticated) ? req.user : null,
    });
}
const login = (req, res) => {
    res.redirect('index', {
        title: 'Trang chủ',
        user: (req.isAuthenticated) ? req.user : null
    });
}
const logout = (req, res) => {
    req.logOut();
    res.redirect('/');
}
module.exports = {
    loginPage,
    login,
    logout
}
