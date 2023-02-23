const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    activity_id: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
    exercise_id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId, required: true, unique: true },
    duration: { type: Number },
    intensity: { type: Number },
    burnt_calories: { type: Number },
    short_description: { type: String },
    date: { type: Date, required: true },
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;