import Sequelize from "sequelize";
import { ecoDb } from "../database/sequelizeDbConnection.mjs "

export const Role = ecoDb.define('roles', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,  // This ensures that the id will auto-increment
        primaryKey: true,     // This sets the id as the primary key
        allowNull: false      // It's good practice to specify allowNull as false for primary keys
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    }
  },
  {
    timestamps: true // This enables `createdAt` and `updatedAt`
  });

  
export async function syncRoleDb() {
    try {
        await Role.sync();
        console.log('Role table created');
    }
    catch(err) {
        console.log(err);
    }
}
