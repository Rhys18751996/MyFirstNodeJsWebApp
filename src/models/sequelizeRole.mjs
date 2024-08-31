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
        await Role.sync();
        console.log('roles table synced');
    }
    catch(err) {
        console.log(err);
    }
}