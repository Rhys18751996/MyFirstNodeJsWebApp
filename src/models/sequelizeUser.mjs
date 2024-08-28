import { DataTypes, Model } from 'sequelize';
import ecoDb from "../database/sequelizeDbConnection.mjs"
import UserRole from "../models/sequelizeUserRole.mjs"

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,  // This ensures that the id will auto-increment
    primaryKey: true,     // This sets the id as the primary key
    allowNull: false      // It's good practice to specify allowNull as false for primary keys
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  address: {
      type: DataTypes.STRING,
      allowNull: true,
  }
  }, {
    sequelize: ecoDb,
    timestamps: true, // This enables `createdAt` and `updatedAt`
    modelName: 'User',
    tableName: 'users',
  });

  export default User;

  // Define Associations
  User.hasMany(UserRole, { foreignKey: 'userId' });

  export async function syncUserDb() {
    try {
        await User.sync();
        console.log('User table created');
    }
    catch(err) {
        console.log(err);
    }
}