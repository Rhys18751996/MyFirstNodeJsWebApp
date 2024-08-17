import * as db from "../database/UserQueries.mjs";

export async function index(req, res) {
    console.log("index (userController)");
    res.render("user/");
}

export async function register(req, res) {
    console.log("regiter (userController)");
    res.render("user/register");
}
export async function registerUser(req, res) {
    console.log("registerUser (userController)");
    let result = {}
    try{
        const reqJson = req.body;
        result.success = await db.createUser(reqJson.user)
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
export async function login(req, res) {
    console.log("login (userController)");
    let user = await db.getUserByUsernameAndPassword();
    res.json(user);
}

// admin controllers
export async function getAllUsers(req, res) {
    console.log("getAllUsers (userController)");
    let user = await db.getUsers();
    res.json(user);
    }

export async function getUser(req, res) {
    console.log("getUser (userController)");
    let user = await db.getUserById(req.params.id);
    res.json(user);
}

export async function searchUser(req, res) {
    let queryString = req.query.q;
    console.log("the user/searchUser/search?q=" + queryString +" route was called");
    let msg = { queryString: queryString };
    res.json(msg);
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
    await db.createTestUser();
    res.send("created test user");
    }
