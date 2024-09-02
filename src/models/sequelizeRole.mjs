import { DataTypes, Model } from 'sequelize';
import ecoDb from "../database/sequelizeDbConnection.mjs"

class Role extends Model {}
Role.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
  }, {
    sequelize: ecoDb,
    timestamps: true, // This enables `createdAt` and `updatedAt`
    modelName: 'Role',
    tableName: 'roles',
  });

  export default Role;

  export async function syncRoleDb() {
    try {
      // Check if the table exists
      const [results] = await ecoDb.query(
          "SELECT * FROM information_schema.tables WHERE table_name = 'roles';"
      );

      if (results.length > 0) {
          console.log('roles table already exists.');
      } else {
          // Table does not exist, sync it
          await Role.sync();
          console.log('roles table created and synced.');
      }
  } catch (err) {
      console.error('Error checking table existence:', err);
  }
}