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
    secret:"thisisoursaltysecret",
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

import { syncUserDb } from "./models/sequelizeUser.mjs";
import { syncRoleDb } from "./models/sequelizeRole.mjs";
import { syncUserRoleDb } from "./models/sequelizeUserRole.mjs";

await syncUserDb(); // this creates the users database
await syncRoleDb();
await syncUserRoleDb();


//import * as userQueries from "./database/UserQueries.mjs";
//import User from "./models/User.mjs";

// get first user in the list of returns users then make it a plain json
// let theUsername = await userQueries.getUserById(1)
// if(theUsername != null) {
//     console.log(theUsername);
// } else {
//     console.log("No user with that id.")
// }

//let allUsers = await userQueries.getUsers();
//console.log(allUsers);

//let whoAmI = await userQueries.getUserByUsernameAndPassword('johnny', '1234');
//console.log(whoAmI);