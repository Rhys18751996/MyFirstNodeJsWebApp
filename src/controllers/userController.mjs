import {getUserById, createUser} from "../database/userQueries.mjs";


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
        result.success = await createUser(reqJson.user)
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


// admin controllers

export async function getUser(req, res) {
    console.log("getUser (userController)");
    // Simulate fetching user data from a database
    const userId = req.params.id;
    const user = getUserById(userId);
    //const user = { id: userId, name: 'John Doe', email: 'john.doe@example.com' };
    res.json(user);
}
export async function searchUser(req, res) {
    const queryString = req.query.q;
    console.log("the user/searchUser/search?q=" + queryString +" route was called");
    const msg = { queryString: queryString };
    res.json(msg);
}

export async function deleteUser(req, res) {
    let result = {}
    try {
        console.log("deleteUser (userController)");
        const reqJson = req.body;
        result.success = await deleteTodo(reqJson.id)
    }
    catch(err) {
        result.success=false;
    }
    finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
}
