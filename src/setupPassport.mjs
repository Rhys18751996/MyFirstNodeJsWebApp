import passport from "passport";
//var LocalStrategy = require("passport-local").Strategy;
import LocalStrategy from ("passport-local").Strategy;
var User = require("./models/user");

export async function serializeTheUser() {
    //turns a user object into an id
    passport.serializeUser(function (user, done) {
        //serializing the user
        done(null, user._id);
    });
}
export async function deserializeTheUser(id) {
    //turns a user object into an id
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}
module.exports = function () {
    passport.use("login", new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: "No user has that Email!" });
            }
            user.checkPassword(password, function (err, isMatch) {
                if (err) { return done(err); }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Invalid password" });
                }
            });
        });
    }));
}