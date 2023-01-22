const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    user_id: { type: Number, required: true},
    activity_id: { type: Number, required: true },
    exercise_id: { type: Number, required: true },
    duration: { type: Number},
    intensity: { type: Number},
    burnt_calories: { type: Number },
    short_description: { type: String},
    date: { type: Date, required: true},
}, {
    timestamps: true
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;