import Sequelize from "sequelize";

const ecoDb = new Sequelize('ecocampusexchangedb', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
});
export default ecoDb;

export async function authenticateDb() {
  try {
    await ecoDb.authenticate();
    console.log('Connection has been established successfully.');
    await ecoDb.close();
    console.log('Connection has been closed successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    ecoDb.close();
  }
} 
