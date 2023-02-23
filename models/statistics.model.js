const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statisticsSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    calories_avg: Number,
    calories_overall: Number,
    burnt_calories: Number,
    intensity_avg: Number,
    goals_achieved: Number
}, {
    timestamps: true
});

const Statistics = mongoose.model('Statistics', statisticsSchema);

module.exports = Statistics;