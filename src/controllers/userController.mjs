import * as userService from "../Services/userService.mjs";
import * as roleService from "../Services/roleService.mjs";
import passport from "passport";
import User from "../models/sequelizeUser.mjs";

export async function index(req, res) {
    console.log("index (userController)");
    res.render("user/");
}

export async function register(req, res) {
    console.log("register (userController)");

    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    res.render("user/register");
}


export async function login(req, res) {
    console.log("login (userController)");
    let Msg = req.query.Msg;
    res.render('user/login', { title: 'LoginPage', Msg:Msg });
}


export async function registerUser(req, res) {
    console.log("registerUser (userController)");
    let result = {}
    try{
        const reqJson = req.body;
        result.success = await userService.createUser(reqJson.user)
    }
    catch(err) {
        result.success=false;
    }
    finally {
        //res.setHeader("content-type", "application/json")
        //res.send(JSON.stringify(result))
        res.redirect("/");
    }
}

export async function submitLogin(req, res) {
    console.log("submitLogin (userController)");

    var username = req.body.username;
    var password = req.body.password;

    let user = await userService.getUserByUsernameAndPassword();
    res.json(user);
}

export async function deleteUser(req, res) {
    let result = {}
    try {
        console.log("deleteUser (userController)");
        const reqJson = req.body;
        result.success = await User.destroy(reqJson.id)
    }
    catch(err) {
        result.success=false;
    }
    finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
        //res.redirect("/");
    }
}

export async function createTestUser(req, res) {
    console.log("createTestUser (userController)");
    await userService.createTestUser();
    res.send("created test user");
    }


async function saltPassword(pasword) {
    let SALT_FACTOR = 10;
    try {
        let salt = await bcrypt.genSalt(SALT_FACTOR);
        let hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    catch(err) {
        console.log(err);
    }
}
 async function checkPasswordIsMatch(){

 }

 export async function searchUser(req, res) {
    let queryString = req.query.q;
    console.log("the user/searchUser/search?q=" + queryString +" route was called");
    let msg = { queryString: queryString };
    res.send(msg);
}
