const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const constant = require('../Utils/constant');

module.exports = {
    checkUsername(username){
        return User.findOne({username: username}).exec();
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
    }
};
