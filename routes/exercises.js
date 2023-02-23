const router = require('express').Router();
const Exercise = require('../models/goal.model');
const jwt = require('jsonwebtoken');

router.route('/').get((req, res) => {
    jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'Not authorized!'
        });
        Exercise.findAll({ user_id: decoded.userId }, (err, exercises) => {
            if (err) {
                return res.status(400).json({
                    title: 'error occured',
                    err: err
                });
            }
            if (!exercises) {
                return res.status(400).json({
                    title: 'Exercises not found',
                })
            }

            return res.status(200).json({
                title: 'Sucess!',
                exercises: exercises
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
            activity_id: req.body.activity_id,
            exercise_id: req.body.exercise_id,
            duration: req.body.duration,
            intensity: req.body.intensity,
            burnt_calories: req.body.burnt_calories,
            short_description: req.body.short_description,
            date: req.body.date
        }

        Exercise.findOneAndUpdate({ _id: req.body._id }, update, { new: true })
            .then(updatedExercise => {
                res.status(200).json({
                    title: 'Updated successully',
                    exercise: updatedExercise
                });
            })
            .catch(err => {
                res.status(400).json({
                    title: "Unable to update"
                });
            });
    });
});

router.route('/delete').delete((req, res) => {
    jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'Not authorized!'
        });

        Goal.deleteOne({_id: req.body._id})
            .then((smth) => {
                res.status(200).json({
                    title: 'Deleted successully',
                });
            })
            .catch(err => {
                res.status(400).json({
                    title: "Unable to delete",
                    err: err
                });
            });
    });
});

//TODO add burnt calories statistics
router.route('/create').post((req, res) => {
    jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'Not authorized!'
        });

        let newExercise = new Exercise({
            user_id: decoded.userId,
            activity_id: req.body.activity_id,
            exercise_id: req.body.exercise_id,
            duration: req.body.duration,
            intensity: req.body.intensity,
            burnt_calories: req.body.burnt_calories,
            short_description: req.body.short_description,
            date: req.body.date
        });

        newExercise.save((err) => {
            if (err) return console.log(err);
            return res.status(200).json({
                title: 'Successfully created',
                goal: newGoal
            })
        }).catch((err) => res.status(400).json({
            title: 'Error with creating exercise',
            err: err
        }));
    });
});

module.exports = router;