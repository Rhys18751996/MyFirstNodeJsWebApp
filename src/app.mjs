import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
//import params from "./params/params";

import webRoutes from "./routes/web/index.mjs";
import apiRoutes from "./routes/api/index.mjs";

import { setupPassport } from "./setupPassport.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(flash());

app.use(cookieParser());
app.use(session({
    secret:"this_is_our_salty_little_secret",
}))


/////////////////////////////////////Passport
import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByUsername } from "./Services/userService.mjs";

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
        // Fetch user from database or any other source
        const theUser = await getUserByUsername(username);

        if (!theUser) {
            return done(null, false, { message: 'User does not exist' });
        }

        if (!(theUser.password == password)) {
            return done(null, false, { message: "Password is not valid." });
         }
         return done(null, true);
      }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(user, done) {
    User.findById(id, function (err, user) {
    done(err, user);
    });
});
/////////////////////////////////////Passport

app.use("/", webRoutes);
app.use("/api", apiRoutes);

app.listen(app.get("port"), () => {
    console.log(`Server started on port ${app.get("port")}\n`);
});


// syncing the database table and associaations on app startup
import { syncDb } from "./models/index.mjs";
await syncDb();
