import { User, Role } from "../models/index.mjs";
import bcrypt from 'bcryptjs';

export async function getUsers() {
    try {
        let users = await User.findAll({
            include: [{
                model: Role,
                as: 'roles', // Ensure this matches the alias defined in the association
                attributes: ['id', 'title'] // Specify which attributes you want from the Role model
            }]
        });
        return users.map(user => user.get({ plain: true }));
    } catch (err) {
        console.error('Error fetching users:', err);
        return [];
    }
}

export async function getUserById(userId) {
    try {
        console.log("getUserById (userQueries)");
        let user = await User.findOne({ 
            where: { id: userId },
            include: [{
                model: Role,
                as: 'roles', // Ensure this matches the alias defined in the association
                attributes: ['id', 'title'] // Specify which attributes you want from the Role model
            }]
        })
        let userJson = user ? user.toJSON() : null;
        return userJson;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export async function getUserByUsername(username) {
    try {
        console.log("getUserById (userQueries)");
        let user = await User.findOne({ 
            where: { username: username },
            include: [{
                model: Role,
                as: 'roles', // Ensure this matches the alias defined in the association
                attributes: ['id', 'title'] // Specify which attributes you want from the Role model
            }]
        })
        let userJson = user ? user.toJSON() : null;
        return userJson;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export async function getUserByUsernameAndPassword(username, password) {
    try {
        console.log("getUserByUsernameAndPassword (userQueries)");
        let user = await User.findOne({ 
            where: { username:username, password:password },
            include: [{
                model: Role,
                as: 'roles', // Ensure this matches the alias defined in the association
                attributes: ['id', 'title'] // Specify which attributes you want from the Role model
            }] 
        })
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
        console.log("createUser (userService)");


        // Create user with all provided fields
        const result = await User.create({
            username: user.username,
            email: user.email,
            password: user.password,
            name: user.name || null,
            phone_number: user.phone_number || null,
            address: user.address || null,
            profilePicture: 'placeholder_128.png' // profile picture default is hardcoded to placeholder image
        });

        console.log('Result:', JSON.stringify(result, null, 2));
        
        return result;
    } catch (err) {
        console.error('Error creating user:', err);
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