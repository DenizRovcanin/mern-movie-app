const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    hash: String,
});

UserSchema.methods.setPassword = function(password) {
    this.hash = bcrypt.hashSync(password, 10, function(err, hash) {
        return hash;
    });

};

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hash, function(err, res) {
        return res;
    });
};

UserSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        username: this.username,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
};

UserSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        username: this.username,
        token: this.generateJWT(),
    };
};

mongoose.model('User', UserSchema);
