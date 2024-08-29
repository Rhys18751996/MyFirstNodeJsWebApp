import passport from "passport";
import Strategy from "passport-local";
//var User = require("./models/Users.mjs");
import User from "./models/sequelizeUser.mjs";
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

}