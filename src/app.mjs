import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import flash from "connect-flash";
//import params from "./params/params";

import webRoutes from "./routes/web/index.mjs";
import apiRoutes from "./routes/api/index.mjs";
import { syncUserDb } from "./models/User.mjs";
import { setupPassport } from "./setupPassport.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

setupPassport();
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:"sdlfkjsdklfjk23434kj234k",
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", webRoutes);
app.use("/api", apiRoutes);

app.listen(app.get("port"), () => {
    console.log(`Server started on port ${app.get("port")}\n`);
});

await syncUserDb(); // this creates the users database


import * as userQueries from "./database/UserQueries.mjs";
import { User } from "./models/User.mjs";


// get first user in the list of returns users then make it a plain json
let theUsername = await userQueries.getUserById(4)
if(theUsername != null) {
    console.log(theUsername.username);
} else {
    console.log("No user with that id.")
}

// make the returning object a nice json object
//let usersPlain = users.map(user => user.get({ plain: true }));
//console.log(usersPlain);