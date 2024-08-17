import { ecoDb } from "./database/sequelizeDbConnection.mjs";

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