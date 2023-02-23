const router = require('express').Router();
const Activity = require('../models/activity.model');

router.route('/').get((req, res) => {
    Activity.find()
        .then(activities => res.json.activities)
        .catch(err => res.status(400).json("Error" + err))
});

module.exports = router;