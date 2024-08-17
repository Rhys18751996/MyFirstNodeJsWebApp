//const {Pool} = require("pg")
//https://node-postgres.com/apis/client
import pg from 'pg'
const { Client } = pg

async function createClient() {
    const client = new Client({
        user: "postgres",
        password: "postgres",
        port: 5432,
        database: "ecocampusexchangedb"
        })
    return client;
}

export async function getUsers() {
    console.log("getUsers (userQueries)");
    let client = await createClient();
    try {
        await client.connect();
        try {
            var results = await client.query('SELECT * FROM users;');
         } catch (err) {
            console.error(err);
         } finally {
            await client.end()
         }

        console.log(results)
        console.log("returned:" + results.rows);

        return resultRows;
    }
    catch(err) {
        return [];
    }
}

export async function getUserById(id) {
    try {
        connectDb();

        query = "SELECT * FROM users WHERE id = " + id;
        const results = await client.query(query);
        //json = JSON.stringify(results);
        json = JSON.parse(results);

        disconnectDb();
        return json;
    }
    catch(err) {
        disconnectDb();
        return [];
    }
}

export async function createUser(userText) {
    try {
        connectDb();

        await client.query("INSERT INTO users (text) VALUES ($1)", [userText]);

        disconnectDb();
        return true
    }
    catch(err) {
        disconnectDb();
        return false;
    }
}

export async function testQuery() {
    let client = await createClient();
    try {
        await client.connect();
        try {
            const result = await client.query('SELECT $1::text as message', ['Hello world!'])
            var resultRows = result.rows[0].message;
         } catch (err) {
            console.error(err);
         } finally {
            await client.end()
         }

        console.log("testQuery() successfully returned: " + resultRows);
        await client.end();
        return resultRows;
    }
    catch(err) {
        return [];
    }
}