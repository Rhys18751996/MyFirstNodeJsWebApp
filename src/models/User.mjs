import { Sequelize, DataTypes, Model } from 'sequelize';
import ecoDb from "../database/sequelizeDbConnection.mjs "


class User extends Model {}
User.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,  // This ensures that the id will auto-increment
    primaryKey: true,     // This sets the id as the primary key
    allowNull: false      // It's good practice to specify allowNull as false for primary keys
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
  phone_number: {
      type: Sequelize.STRING,
      allowNull: true,
  },
  address: {
      type: Sequelize.STRING,
      allowNull: true,
  }
  }, {
    ecoDb,
    timestamps: true, // This enables `createdAt` and `updatedAt`
    modelName: 'User'
  });
  export default User;

  // Define Associations
  User.hasMany(UserRole, { foreignKey: 'userId' });
  //UserRole.belongsTo(User, { foreignKey: 'userId' });

  //Role.hasMany(UserRole, { foreignKey: 'roleId' });
  //UserRole.belongsTo(Role, { foreignKey: 'roleId' });


  export async function syncUserDb() {
    try {
        await User.sync();
        console.log('User table created');
    }
    catch(err) {
        console.log(err);
    }
}


// export const User = ecoDb.define('users', {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,  // This ensures that the id will auto-increment
//     primaryKey: true,     // This sets the id as the primary key
//     allowNull: false      // It's good practice to specify allowNull as false for primary keys
//   },
//     username: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true
//       }
//     },
//     email: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true
//       }
//     },
//     password: {
//       type: Sequelize.STRING,
//       allowNull: false,
//       validate: {
//         notEmpty: true
//       }
//     },
//     name: {
//       type: Sequelize.STRING,
//       allowNull: true,
//     },
//     phone_number: {
//         type: Sequelize.STRING,
//         allowNull: true,
//     },
//     address: {
//         type: Sequelize.STRING,
//         allowNull: true,
//     }
//   },
//   {
//     timestamps: true // This enables `createdAt` and `updatedAt`
//   });





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