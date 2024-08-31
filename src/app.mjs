import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";

import webRoutes from "./routes/web/index.mjs";
import apiRoutes from "./routes/api/index.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static('public'));
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(flash());

app.use(cookieParser());
app.use(session({
    secret:"this_is_our_salty_little_secret",
    resave:false,
    saveUninitialized:false,
    cookie: { secure: false } // Set to true if using HTTPS
}))


/////////////////////////////////////Passport
import passport from "passport";
import setupPassport from "./setupPassport.mjs"

app.use(passport.initialize());
app.use(passport.session());
setupPassport(passport);

app.use("/", webRoutes);
app.use("/api", apiRoutes);

app.listen(app.get("port"), () => {
    console.log(`Server started on port ${app.get("port")}\n`);
});


// syncing the database table and associaations on app startup
import { syncDb } from "./models/index.mjs";
await syncDb();
