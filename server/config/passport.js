const User = require('mongoose').model('User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
}, (username, password, done) => {
    User.findOne({ username }, function(error, user) {

        if(error) {
            return done(error);
        }

        if(!user) {
            return done(null, false, {
                message: 'User not found',
            })
        }

        if(!user.validatePassword(password)) {
            return done(null, false, {
                message: 'Password not valid',
            })
        }

        return done(null, user);
    });
}));
