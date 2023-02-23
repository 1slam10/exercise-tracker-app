const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true},
    name: { type: String, required: true},
    password: { type: String, required: true},
    favourites: [{type: Schema.Types.ObjectId, ref: 'Activity'}]
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;