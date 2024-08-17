import { User } from "../models/User.mjs";

export async function getUsers() {
    try {
        console.log("\ngetUsers (userQueries)");
        let users = await User.findAll();
        return JSON.parse(JSON.stringify(users));
    } 
    catch(err) {
        return [];
    }
}

export async function getUserById(userId) {
    try {
        console.log("getUserById (userQueries)");
        let user = await User.findOne({ where: { id: userId } })
        let result = await user ? user.toJSON() : null;
        //console.log(result);
        return result;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export async function getUserByUsernameAndPassword(username, password) {
    try {
        console.log("getUserByUsernameAndPassword (userQueries)");
        let user = await User.findOne({ where: { username:username, password:password } })
        let result = await user ? user.toJSON() : null;
        return result;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export async function createUser(user) {
    try {
        console.log("createUser (userQueries)");
        let result = User.create({
            username: user.username,
            email: user.email,
            password: user.password,
        });
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}

export async function createTestUser() {
    try {
        console.log("createTestUser (userQueries)");
        let result = User.create({
            username: "testUser",
            email: "testUser@email.com",
            password: "1234",
        });
    }
    catch(err) {
        console.log(err);
        throw err;
    }
}

export async function destroyUser(userId) {
    try {
        console.log("destroyUser (userQueries)");
        let result = await User.destroy({ where: { id:userId } });
    }
    catch(err) {
        console.log(err);
        throw err;      
    }
}