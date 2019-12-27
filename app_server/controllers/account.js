const randomstring = require('randomstring');
const mailer = require('../misc/mailer');
const constant = require('../Utils/constant');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const loginPage = (req, res) => {
    res.render('login', {
        title: 'Đăng nhập',
        layout: false ,
        error_messages: req.flash('error'),
        success_messages: req.flash('success')
    });
}
const login = (req, res) => {
    res.redirect('index', {
        title: 'Trang chủ',
    });
}

const verifyPage = (req, res) => {
    res.render('verify', {
        title: 'Xác nhận tài khoản',
        layout: false ,
        error_messages: req.flash('error'),
        success_messages: req.flash('success')
    });
}
const verify = async (req, res, next) => {
    try {
      const { secretToken } = req.body.secretToken;

      // Find account with matching secret token
      const user = await User.findToken(secretToken);
      if (!user) {
        req.flash('error', 'No user found.');
        res.redirect('/verify');
        return;
      }

      user.active = true;
      user.secretToken = '';
      await user.save();

      req.flash('success', 'Thank you! Now you may login.');
      res.redirect('/login');
    } catch(error) {
      next(error);
    }
  }
const emailPage = (req, res) => {
    res.render('enterEmail', {
        title: 'Xác nhận Email',
        layout: false,
        error_messages: req.flash('error'),
        success_messages: req.flash('success')
    });
}
const email =  async (req, res, next) => {
    try {
      const email = req.body.email;

      // Find account with matching secret token
      const secretToken = randomstring.generate();
      const user = await User.findEmail(email);
      console.log(user);
      console.log(email);
      if (!user) {
        req.flash('error', 'Không có người dùng với Email vừa nhập.');
        res.redirect('/enterEmail');
        return;
      }
      console.log(secretToken);
      user.secretToken = secretToken;
      console.log(user);
      await user.save();
      console.log(user);
      const html = `Hi there,
        <br/>
        Thank you for registering!
        <br/><br/>
        Please verify your email by typing the following token:
        <br/>
        Token: <b>${secretToken}</b>
        <br/>
        On the following page:
        <a href="http://localhost:8080/pwdEmail">http://localhost:8080/pwdEmail</a>
        <br/><br/>
        Have a pleasant day.` 

        // Send email
        await mailer.sendEmail('admin@codeworkrsite.com', req.body.email, 'Please verify your email!', html);

        req.flash('success', 'Please check your email.');
        res.redirect('/login');
    } catch(error) {
      next(error);
    }
}
const pwdEmailPage = (req, res) => {
    res.render('pwdEmail', {
        title: 'Đổi mật khẩu mới',
        layout: false,
        error_messages: req.flash('error'),
        success_messages: req.flash('success')
    });
}
const pwdEmail = async (req, res, next) => {
    try {
      const secretToken = req.body.secretToken;

      // Find account with matching secret token
      const user = await User.findToken(secretToken);
      if (!user) {
        req.flash('error', 'No user found.');
        res.redirect('/pwdEmail');
        return;
      }
      // user.password = await hashPassword(req.body.password);
      user.password = bcrypt.hashSync(req.body.password, constant.SALT_ROUND);
      user.secretToken = '';
      await user.save();
      req.flash('success', 'Đổi mật khẩu thành công, bây giờ bạn có thể đăng nhập lại.');
      res.redirect('/login');
    } catch(error) {
      next(error);
    }
  }

const changePwdPage = (req, res) => {
    res.render('changePwd', {
        title: 'Đổi mật khẩu mới',
        layout: false,
        error_messages: req.flash('error'),
        success_messages: req.flash('success')
    });
}
const changePwd = async (req, res, next) => {
    try {
      const pwdOld = req.body.passwordOld;
      const pwd = req.body.password;
      console.log(pwdOld);
      
      var user = null;
      if (req.isAuthenticated) {
        user = req.user;
      } else {
        req.flash('error', 'Không có mật khẩu vừa nhập.');
        res.redirect('/changePwd');
        return;
      }
      console.log(user);
      const temp = bcrypt.compareSync(pwdOld, user.password);
      console.log(temp);
      if(!temp){
        req.flash('error', 'Không có mật khẩu vừa nhập.');
        res.redirect('/changePwd');
        return;
      }
      user.password = bcrypt.hashSync(req.body.password, constant.SALT_ROUND);
      await user.save();
      console.log(user);
      req.flash('success', 'Đổi mật khẩu thành công, bây giờ bạn có thể đăng nhập lại.');
      res.redirect('/login');
    } catch(error) {
      next(error);
    }
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
    verifyPage,
    verify,
    emailPage,
    email,
    pwdEmailPage,
    pwdEmail,
    changePwdPage,
    changePwd,
    logout,
    signupPage,
    signup
};
