const router = require('express').Router();
const Goal = require('../models/goal.model');
const jwt = require('jsonwebtoken');

router.route('/').get((req, res) => {
    jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'Not authorized!'
        });
        Goal.findAll({ user_id: decoded.userId }, (err, goals) => {
            if (err) {
                return res.status(400).json({
                    title: 'error occured',
                    err: err
                });
            }
            if (!goals) {
                return res.status(400).json({
                    title: 'Goals not found',
                })
            }

            return res.status(200).json({
                title: 'Sucess!',
                goals: goals
            })
        });
    });
})

router.route('/edit').post((req, res) => {
    jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'Not authorized!'
        });

        let update = {
            user_id: decoded.userId,
            description: req.body.description,
            isCompleted: req.body.isCompleted,
            target_time: req.body.target_time
        }

        Goal.findOneAndUpdate({ _id: req.body._id }, update, { new: true })
            .then(updatedGoal => {
                //TODO: to add profile update
                res.status(200).json({
                    title: 'Updated successully',
                    goal: updatedGoal
                });
            })
            .catch(err => {
                res.status(400).json({
                    title: "Unable to update",
                    err: err
                });
            });
    });
});

router.route('/edit/completed').post((req, res) => {
    jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'Not authorized!'
        });

        let update = {
            isCompleted: req.body.isCompleted,
        }

        Goal.findOneAndUpdate({ _id: req.body._id }, update, { new: true })
            .then(updatedGoal => {
                res.status(200).json({
                    title: 'Updated successully',
                    goal: updatedGoal
                });
            })
            .catch(err => {
                res.status(400).json({
                    title: "Unable to update"
                });
            });
    });
});

router.route('/create').post((req, res) => {
    jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
        if(err) return res.status(401).json({
            title: 'Not authorized!'
        });

        let newGoal = new Goal({
            user_id: decoded.userId,
            description: req.body.description,
            isCompleted: false,
            target_time: req.body.target_time
        });

        newGoal.save((err) => {
            if (err) return console.log(err);
            return res.status(200).json({
                title: 'Successfully added',
                goal: newGoal
            })
        }).catch((err) => res.status(400).json({
                title: 'Error with creating goal',
                err: err
            }));
    });
});

module.exports = router;