const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const constant = require('../Utils/constant');

module.exports = {
    checkUsername(username){
        return User.findOne({username: username}).exec();
    },
    checkEmail(email){
        return User.findOne({email: email}).exec();
    },
    findToken(secretToken){
        return User.findOne({secretToken: secretToken}).exec();
    },
    findEmail(email){
        return User.findOne({email: email}).exec();
    },
    addUser(username, email, password, secretToken){
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, constant.SALT_ROUNDS, (err,   hash) => {
                const newUser = new User({
                    username: username,
                    email: email,
                    password: hash,
                    type: constant.type["customer"],
                    isActive: false,
                    secretToken: secretToken
                });
                try {
                    newUser.save(function (err) {
                        if (err){
                            resolve(false);
                        } else {
                            resolve(true);
                        }
                    });
                } catch(err) {
                    console.log('error' + err);
                }
            })
        })
    },
    getUser(userId){
        return User.findOne({userId: userId}).exec();
    },
    setUserInfo(userId, info){
        return User.findOneAndUpdate({userId: userId}, {
            firstName: info.firstName || "",
            lastName: info.lastName || "",
            gender: info.gender || "",
            email: info.email || "",
            birthDate: info.birthDate || "",
            phone: info.phone || "",
            address: info.address || "",
            city: info.city || "",
        }).exec();
    }
};
