const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: Number,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    birthDate: Date,
    address: String,
    city: Number,
    phone: String,
    avatar: String,
    createdDate: Date
});

userSchema.index({coords: '2dsphere'});
mongoose.model('User', userSchema);
