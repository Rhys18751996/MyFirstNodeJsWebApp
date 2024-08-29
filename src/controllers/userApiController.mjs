import * as userService from "../Services/userService.mjs";
import * as roleService from "../Services/roleService.mjs";
import passport from "passport";
import User from "../models/sequelizeUser.mjs";


export async function getAllUsers(req, res) {
    try {
        console.log("getAllUsers (userController)");
        let user = await userService.getUsers();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
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