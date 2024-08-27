import Sequelize from "sequelize";
import { ecoDb } from "../database/sequelizeDbConnection.mjs "

export const UserRole = ecoDb.define('userRoles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,  // This ensures that the id will auto-increment
        primaryKey: true,     // This sets the id as the primary key
        allowNull: false      // It's good practice to specify allowNull as false for primary keys
    },
    userId: {
        type: Sequelize.INTEGER
    },
    roleId: {
        type: Sequelize.INTEGER
    }
  },
  {
    timestamps: true // This enables `createdAt` and `updatedAt`
  });

  
export async function syncUserRoleDb() {
    try {
        await Role.sync();
        console.log('UserRole table created');
    }
    catch(err) {
        console.log(err);
    }
}