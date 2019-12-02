const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const constant = require('../Utils/constant');

const loginPage = (req, res) => {
    res.render('login', {
        title: 'Đăng nhập',
        layout: false ,
    });
}
const login = (req, res) => {
    res.redirect('index', {
        title: 'Trang chủ',
    });
}
const logout = (req, res) => {
    req.logOut();
    res.redirect('/');
}
const signupPage = (req, res) => {
    res.render('signup', {
        title: 'Đăng ký',
        layout: false ,
    });
}
const signup =  async (req, res) => {
    let users = await User.find({username: req.body.username}).exec();
    if (users.length > 0){
        res.render('signup', {
            title: 'Đăng ký',
            layout: false,
            error_message: "Tên đăng nhập đã tồn tại !!!"
        });
    } else {
        bcrypt.hash(req.body.password, constant.SALT_ROUNDS, (err,   hash) => {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                type: constant.type["customer"]
            });
            newUser.save((err) => {
                if (err){
                    res.render('signup', {
                        title: 'Đăng ký',
                        layout: false,
                        error_message: "Đăng ký thất bại !!!"
                    });
                } else {
                    res.render('login', {
                        title: 'Đăng nhập',
                        layout: false,
                        signup_success_message: "Đăng ký tài khoản thành công"
                    });
                }
            })
        })
    }
}
module.exports = {
    loginPage,
    login,
    logout,
    signupPage,
    signup
}
