const randomstring = require('randomstring');
const mailer = require('../misc/mailer');

const User = require('../models/user');

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

const verify = (req, res) => {
    res.render('verify', {
        title: 'Xác nhận tài khoản',
        layout: false ,
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
const signup =  async (req, res, next) => {
    try {
        let user = await User.checkUsername(req.body.username);
        const secretToken = randomstring.generate();
        if (user){
            res.render('signup', {
                title: 'Đăng ký',
                layout: false,
                error_message: "Tên đăng nhập đã tồn tại !!!"
            });
        } else {
            const result = await User.addUser(req.body.username, req.body.email, req.body.password, secretToken);
            // if (result){
            //     //Success
            //     res.render('login', {
            //         title: 'Đăng nhập',
            //         layout: false,
            //         signup_success_message: "Đăng ký tài khoản thành công"
            //     });
            // } else {
            //     //Fail
            //     res.render('signup', {
            //         title: 'Đăng ký',
            //         layout: false,
            //         error_message: "Đăng ký thất bại !!!"
            //     });
            // }
            const html = `Hi there,
              <br/>
              Thank you for registering!
              <br/><br/>
              Please verify your email by typing the following token:
              <br/>
              Token: <b>${secretToken}</b>
              <br/>
              On the following page:
              <a href="http://localhost:8080/verify">http://localhost:8080/verify</a>
              <br/><br/>
              Have a pleasant day.` 

              // Send email
              await mailer.sendEmail('admin@codeworkrsite.com', req.body.email, 'Please verify your email!', html);

              req.flash('success', 'Please check your email.');
              res.redirect('/login');
        }
    } catch(error) {
      next(error);
    }
}
module.exports = {
    loginPage,
    login,
    verify,
    logout,
    signupPage,
    signup
};
