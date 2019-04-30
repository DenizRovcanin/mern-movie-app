const router = require('express').Router();
const User = require('mongoose').model('User');
const passport = require('passport');
require('../../config/passport');

//Signup
router.post('/signup', (req, res, next) => {
    const {body} = req;

    if (!body.username) {
        return res.status(422).json({
            errors: {
                username: 'Username is required',
            },
        });
    }

    if (!body.password) {
        return res.status(422).json({
            errors: {
                password: 'Password is required',
            },
        });
    }

    return User.findOne({username: body.username}, (error, user) => {
        if (user) {
            return res.status(422).json({
                message: 'User already exists!'
            })
        }
        const finalUser = new User(body);
        finalUser.setPassword(body.password);
        finalUser.save().then(() => {
            return res.status(200).json({
                message: 'Signed up successfully!',
                user: finalUser.toAuthJSON(), // provide token for testing of auth route
            });
        }).catch(error => res.send(error));
    });

});

//Login and authenticate
router.post('/login', (req, res, next) => {
    const {body} = req;

    if (!body.username) {
        return res.status(422).json({
            errors: {
                username: 'Username is required',
            },
        });
    }

    if (!body.password) {
        return res.status(422).json({
            errors: {
                password: 'Password is required',
            },
        });
    }

    return passport.authenticate('local', {session: false}, (err, data, info) => {
        if (err) {
            res.status(404).json(err);
            return;
        }

        if (data) {
            let finalUser = data;
            finalUser.token = finalUser.generateJWT();

            return res.status(200).json({
                message: 'Logged in successfully!',
                user: finalUser.toAuthJSON()}); // provide token for testing of auth route
        } else {
            res.status(401).json(info);
        }
    })(req, res, next)

});

module.exports = router;
