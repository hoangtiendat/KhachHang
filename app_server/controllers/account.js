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
        title: 'Nhập Email',
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
      if (!user) {
        req.flash('error', 'Không có người dùng với Email vừa nhập.');
        res.redirect('/enterEmail');
        return;
      }
      user.secretToken = secretToken;
      await user.save();
      const html = `Hi there,
        <br/><br/>
        Hãy xác nhận tài khoản của bạn bằng cách gõ token sau đây:
        <br/>
        Token: <b>${secretToken}</b>
        <br/>
        Theo trang:
        <a href="https://floating-sea-37462.herokuapp.com/pwdEmail">https://floating-sea-37462.herokuapp.com/pwdEmail</a>
        <br/><br/>
        Chúc bạn một ngày tốt đẹp.
        <br/><br/>
        Thân,
        <a href="https://floating-sea-37462.herokuapp.com/">Shoppy</a>` 

        // Send email
        await mailer.sendEmail('admin@codeworkrsite.com', req.body.email, 'Hãy xác nhận email của bạn!', html);

        req.flash('success', 'Làm ơn hãy kiểm tra email của bạn.');
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
};

const changePwdPage = (req, res) => {
    res.render('changePwd', {
        title: 'Đổi mật khẩu mới',
        layout: false,
        error_messages: req.flash('error'),
        success_messages: req.flash('success')
    });
};
const changePwd = async (req, res, next) => {
    try {
      const pwdOld = req.body.passwordOld;
      const pwd = req.body.password;
      
      var user = null;
      if (req.isAuthenticated) {
        user = req.user;
      } else {
        req.flash('error', 'Không có mật khẩu vừa nhập.');
        res.redirect('/changePwd');
        return;
      }
      const temp = bcrypt.compareSync(pwdOld, user.password);
      if(!temp){
        req.flash('error', 'Không có mật khẩu vừa nhập.');
        res.redirect('/changePwd');
        return;
      }
      user.password = bcrypt.hashSync(req.body.password, constant.SALT_ROUND);
      await user.save();
      req.flash('success', 'Đổi mật khẩu thành công, bây giờ bạn có thể đăng nhập lại.');
      res.redirect('/login');
    } catch(error) {
      next(error);
    }
  }

const logout = (req, res) => {
    req.logOut();
    res.redirect('/');
};
const signupPage = (req, res) => {
    res.render('signup', {
        title: 'Đăng ký',
        layout: false ,
    });
};
const signup =  async (req, res, next) => {
    try {
        let user = await User.checkUsername(req.body.username);
        let email = await User.checkEmail(req.body.email);
        const secretToken = randomstring.generate();
        if (email){
            res.render('signup', {
                title: 'Đăng ký',
                layout: false,
                error_messages: "Email đã tồn tại !!!"
            });
        }
        if (user){
            res.render('signup', {
                title: 'Đăng ký',
                layout: false,
                error_messages: "Tên đăng nhập đã tồn tại !!!"
            });
        } else {
            const result = await User.addUser(req.body.firstName, req.body.lastName, req.body.username, req.body.email, req.body.phone, req.body.address, req.body.password, secretToken);

            const html = `Chào bạn!,
              <br/>
              Cảm ơn bạn đã đăng ký ứng dụng của chúng tôi!
              <br/><br/>
              Hãy xác nhận tài khoản của bạn bằng cách gõ token sau đây:
              <br/>
              Token: <b>${secretToken}</b>
              <br/>
              Theo trang:
              <a href="https://floating-sea-37462.herokuapp.com/verify">https://floating-sea-37462.herokuapp.com/verify</a>
              <br/><br/>
              Chúc bạn một ngày tốt đẹp.
              <br/><br/>
              Thân,
              <a href="https://floating-sea-37462.herokuapp.com/">Shoppy</a>
              ` 

              // Send email
              await mailer.sendEmail('admin@codeworkrsite.com', req.body.email, 'Hãy xác nhận email của bạn!', html);

              req.flash('success', 'Làm ơn hãy kiểm tra email của bạn.');
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
