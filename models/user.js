const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/// create schema and model

const UserSchema = new Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
