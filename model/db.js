const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        maxlength: 30,
        minlength: 5,
        required: true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true
    },
    date: { type: Date, default: Date.now },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'app']
    }

});
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, email: this.email, role: this.role },
        config.get('jwtPrivateKey'));
    return token;
}
const db = mongoose.model('Userdetail', userSchema);

module.exports = db;