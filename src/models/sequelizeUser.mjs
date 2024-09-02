import { DataTypes, Model } from 'sequelize';
import ecoDb from "../database/sequelizeDbConnection.mjs"

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
  profilePicture: {
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

  export async function syncUserDb() {
    try {
        // Check if the table exists
        const [results] = await ecoDb.query(
            "SELECT * FROM information_schema.tables WHERE table_name = 'users';"
        );

        if (results.length > 0) {
            console.log('users table already exists.');
        } else {
            // Table does not exist, sync it
            await User.sync();
            console.log('users table created and synced.');
        }
    } catch (err) {
        console.error('Error checking table existence:', err);
    }
}