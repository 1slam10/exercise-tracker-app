const router = require('express').Router();
const Activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    Activity.find()
        .then(activities => res.json.activities)
        .catch(err => res.status(400).json("Error" + err))
});

router.route('/add').post((req, res) => {
    let newActivity = new Activity({
        activity_name: req.body.activity_name,
        workout_name: req.body.workout_name,
        activity_description: req.body.activity_description,
        equipment_needed: req.body.equipment_needed,
        video_url: req.body.video_url
    });
    newActivity.save()
        .then(() => res.status(200).json({
            title: 'Activity added',
        }))
        .catch((err) => {
            console.log(err);
            res.status(400).json({
            title: 'Unable to add activity'
        })});
});

router.route('/names').get((req, res) => {
    Activity.find()
        .then(activities => res.json.activities)
        .catch(err => res.status(400).json("Error" + err))
});

module.exports = router;