import Sequelize from "sequelize";
import { ecoDb } from "../database/sequelizeDbConnection.mjs "

export const User = ecoDb.define('users', {
  id: {
    primaryKey: true,
    type: Sequelize.INTEGER
  },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true,
    }
  });

  
export async function syncUserDb() {
    try {
        await User.sync();
        console.log('table created');
    }
    catch(err) {
        console.log(err);
    }
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