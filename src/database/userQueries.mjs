import { client } from "./psqlConnection.mjs";


export async function getAllUsers() {
    try {
        client.connectDb();

        console.log("attempting getAllUsers() in userQueries");
        query = "SELECT * FROM user";
        const results = await client.query(query);
        //json = JSON.stringify(results);
        json = JSON.parse(results);

        client.disconnectDb();
        return json;
    }
    catch(err) {
        client.disconnectDb();
        return [];
    }
}

export async function getUserById(id) {
    try {
        client.connectDb();

        //query = "SELECT * FROM user WHERE id = ${id}"
        query = "SELECT * FROM user WHERE id = " + id;
        const results = await client.query(query);
        //json = JSON.stringify(results);
        json = JSON.parse(results);

        client.disconnectDb();
        return json;
    }
    catch(err) {
        client.disconnectDb();
        return [];
    }
}

export async function createUser(userText) {
    try {
        client.connectDb();

        await client.query("INSERT INTO user (text) VALUES ($1)", [userText]);

        client.disconnectDb();
        return true
    }
    catch(err) {
        client.disconnectDb();
        return false;
    }
}