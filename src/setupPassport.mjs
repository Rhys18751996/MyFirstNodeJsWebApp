import passport from "passport";
import Strategy from "passport-local";
//var User = require("./models/Users.mjs");
import User from "./models/User.mjs";
var LocalStrategy = Strategy.Strategy;

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

export async function setupPassport() {
    passport.use("login", new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: "Username not found!" });
            }
            userController.checkPasswordIsMatch(password, function (err, isMatch) {
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