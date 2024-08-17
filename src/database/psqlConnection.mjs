//const {Pool} = require("pg")
//https://node-postgres.com/apis/client
import pg from 'pg'
const { Client } = pg

export const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "local socket",
    port: 5432,
    database: "ecoCampusExchangeDb"
    })

export async function connectDb() {
    try {
        await client.connect(); 
    }
    catch(e) {
        console.error(`Failed to connect ${e}`)
    }
}

export async function disconnectDb() {
    try {
        await client.end();
    }
    catch(e) {
        console.error(`Failed to close ${e}`)
    }
}

export async function testDbConnection() {
    console.log("connecting to database...")
    try {
        await client.connect(); 
        console.log("connection success!")
    }
    catch(e) {
        console.error(`Failed to connect ${e}`)
    }

    try {
        await client.end()
        console.log("connection close success!")
    }
    catch(e) {
        console.error(`Failed to close ${e}`)
    }
}

