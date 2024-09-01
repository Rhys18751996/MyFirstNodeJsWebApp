import passport from "passport";
import Strategy from "passport-local";
import bcrypt from 'bcryptjs'
import User from "./models/sequelizeUser.mjs";
var LocalStrategy = Strategy.Strategy;
import { getUserByUsername } from './services/userService.mjs'

passport.serializeUser((user, done) => {
  var roleTitles = user.roles.map(role => role.title);

  // Serialize properties into the session
  done(null, { 
    id: user.id, 
    username: user.username,
    roles: roleTitles
    });
});

  passport.deserializeUser(async (data, done) => {
    try {
        // Optionally fetch and attach additional properties if not in the user object

        done(null, data); // Restore the data
    } catch (err) {
        done(err); // Handle errors
    }
});

const configurePassport = (passport) => {
    passport.use(
      new LocalStrategy(async (username, password, done) => {
        try {
          var user = await getUserByUsername(username);
          if (!user) {
            return done(null, false, { message: 'No user found' });
          }
  
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        } catch (err) {
          return done(err);
        }
      })
    );
  };
  
  export default configurePassport;