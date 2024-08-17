import Sequelize from "sequelize";
import * as db from "../database/sequelize";

const User = db.define('users', {
    id: {
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    phoneNumber: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    }
  });
  
export async function syncDb() {
    User.sync().then(() => {
        console.log('table created');
      });
}





/*
INSERT INTO users (username, email, password)
VALUES ('johnny', 'john.doe@example.com', '1234');
*/




/*
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    phoneNumber VARCHAR(15),
    address TEXT
);
*/