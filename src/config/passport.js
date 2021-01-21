const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

passport.use(new LocalStrategy({
    usernameField: 'email'
    }, async (email, password, done) => {
        const user = await User.findOne({email});
        if(!user){
            return done(null, false, {messages: 'Not user found'});
        } else {
            const match = await user.matchPassword(password);
            if(match) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'contra incorrecta'});
            }
        }
    }
));

//collback
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
    done(err, user);
    });
});