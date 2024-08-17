//const {Pool} = require("pg")
//https://node-postgres.com/apis/client
import pg from 'pg'
const { Client } = pg

export async function createClient() {
    const client = new Client({
        user: "postgres",
        password: "postgres",
        port: 5432,
        database: "ecocampusexchangedb"
        })
    return client;
}
