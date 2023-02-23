const router = require('express').Router();
let User = require('../models/user.model');
let Statistics = require('../models/statistics.model');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
//TODO add a route to add favourites
router.route('/login').post((req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
        if(err) {
            return res.status(500).json({
                title: 'Invalid email or password',
                error: err
            })
        }
        if (!user) {
            return res.status(400).json({
                title: 'Invalid email or password',
            })
        }
        if(!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Invalid email or password',
            })
        }

        let token = jwt.sign({ userId: user._id}, 'secretkey');
        return res.status(200).json({
            title: 'login success',
            token: token
        })
    });
});

router.route('/signup').post((req, res) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const favourites = [];

    const newUser = new User({ 
        email: email, 
        name: name,
        password: bcrypt.hashSync(password, 10),
        favourites: favourites
    });

    newUser.save()
        .then(() => {
            let Stats = new Statistics({
                user_id: newUser._id,
                calories_avg: 0,
                calories_overall: 0,
                burnt_calories: 0,
                intensity_avg: 0,
                goals_achieved: 0
            });
            return Stats.save();
        })
        .then(() => res.status(200).json({
            title: 'User added and statistics assigned!',
        }))
        .catch((err) => res.status(400).json({
            title: 'user already exists'
        }));
});

router.route('/info').get((req, res) => {
    jwt.verify(req.headers.token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).json({
            title: 'Not authoruzed!'
        });

        User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) {
                return res.status(400).json({
                    title: 'error occured',
                    err: err
                });
            }
            if (!user) {
                return res.status(400).json({
                    title: 'User not found',
                })
            }
            var response = {
                name: user.name,
                email: user.email,
            };

            Statistics.findOne({ user_id: user._id }, (err, stats) => {
                if (err) {
                    return res.status(400).json({
                        title: 'error occured',
                        err: err
                    });
                }

                response.calories_avg = stats.calories_avg;
                response.calories_overall = stats.calories_overall;
                response.burnt_calories = stats.burnt_calories;
                response.intensity_avg = stats.intensity_avg;
                response.goals_achieved = stats.goals_achieved;

                return res.status(200).json(Object.assign({ title: 'Sucess!' }, response));
            });
        });
    });
});

module.exports = router;
