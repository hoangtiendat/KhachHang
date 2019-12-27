const User = require('../models/user');
const Param = require('../models/params');
const constant = require('../Utils/constant');

const profile = async (req, res) => {
    if (!req.isAuthenticated()){
        res.redirect('/login');
    } else {
        try {
            const user = await User.getUser(req.user.userId);
            res.render('profile', {
                title: 'Nguời dùng',
                user: Object.assign({}, user._doc, {
                    typeStr: constant.getUserType(user.type),
                    birthDate: (user.birthDate)? user.birthDate.toString() : "",
                    createdDate: user.createdDate.toString(),
                })
            });
        } catch(err) {
            console.log('err', err);
        }
    }
};

const editProfilePage = async (req, res) => {
    if (!req.isAuthenticated()){
        res.redirect('/login');
    } else {
        try {
            const user = await User.getUser(req.user.userId);
            const cities = await Param.getAllCity();
            res.render('edit_profile', {
                title: 'Hồ sơ',
                user: Object.assign({}, user._doc, {
                    birthDate: (user.birthDate)? user.birthDate.toString() : "",
                    createdDate: user.createdDate.toString(),

                }),
                cities: cities
            });
        } catch(err) {
            console.log('err', err);
        }
    }
};

const editProfile = async (req, res) => {
    if (!req.isAuthenticated()){
        res.redirect('/login');
    } else {
        try {
            const info = {
                firstName: req.body.firstName || "",
                lastName: req.body.lastName || "",
                gender: req.body.gender || "",
                email: req.body.email || "",
                birthDate: req.body.birthDate || "",
                phone: req.body.phone || "",
                address: req.body.address || "",
                city: req.body.city || "",
            };
            const user = await User.setUserInfo(req.user.userId, info);
            if (user) {
                res.redirect('/profile');
            } else {
                const user = await User.getUser(req.user.userId);
                const cities = await Param.getAllCity();
                res.render('edit_profile', {
                    title: 'Hồ sơ',
                    user: Object.assign({}, user._doc, {
                        birthDate: (user.birthDate)? user.birthDate.toString() : "",
                        createdDate: user.createdDate.toString(),
                        error_message: "Cập nhật thông tin thất bại"
                    }),
                    cities: cities
                });
            }

        } catch(err) {
            console.log('err', err);
        }
    }
};



module.exports = {
    profile,
    editProfilePage,
    editProfile
};
