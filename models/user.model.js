const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: {},
    email: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    name: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    password: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    favourites: []
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;