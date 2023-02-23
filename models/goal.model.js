const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: String,
    isCompleted: Boolean,
    target_time: Date,
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;