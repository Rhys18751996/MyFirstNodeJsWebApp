import * as userService from "../services/userService.mjs";
import * as roleService from "../services/roleService.mjs";


export async function getAllUsers(req, res) {
    try {
        console.log("getAllUsers (userController)");
        let user = await userService.getUsers();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
}

export async function getUser(req, res) {
    console.log("getUser (userController)");
    let user = await userService.getUserById(req.params.id);
    res.json(user);
}

export async function searchUser(req, res) {
    let queryString = req.query.q;
    console.log("the user/searchUser/search?q=" + queryString +" route was called");
    let msg = { queryString: queryString };
    res.json(msg);
}


export async function getAllRoles(req, res) {
    try {
        console.log("getAllRoles (userController)");
        let user = await roleService.getRoles();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch roles' });
    }
}