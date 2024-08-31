import passport from "passport";
import Strategy from "passport-local";
import bcrypt from 'bcryptjs'
import User from "./models/sequelizeUser.mjs";
var LocalStrategy = Strategy.Strategy;

passport.serializeUser((user, done) => {
  // Serialize additional user properties into the session
  done(null, { id: user.id, username: user.username });
});

  passport.deserializeUser(async (data, done) => {
    console.log('Deserializing user with data:', data); // Log the deserialized data
    try {
        // Fetch the full user object using the ID
        const user = await User.findByPk(data.id);

        // You can also directly use additional properties if needed
        // For example, if you stored `username` and it doesn't change,
        // you can use it directly without fetching from the database.

        // Optionally attach additional properties if not in the user object
        user.username = data.username;

        done(null, user); // Restore the full user object
    } catch (err) {
        done(err); // Handle errors
    }
});

const configurePassport = (passport) => {
    passport.use(
      new LocalStrategy(async (username, password, done) => {
        try {
          const user = await User.findOne({ where: { username } });
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