const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    activity_id: { type: Number, required: true },
    activity_name: { type: String, required: true },
    workout_name: { type: String, required: true},
    activity_description: {type: String, required: true},
    equipment_needed: [],
    video_url: { type: String, required: true}
}, {
    timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;