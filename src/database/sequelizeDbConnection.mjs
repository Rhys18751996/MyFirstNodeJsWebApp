import Sequelize from "sequelize";

export var ecoDb = new Sequelize('ecocampusexchangedb', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
});

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
