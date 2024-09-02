import { DataTypes, Model } from 'sequelize';
import ecoDb from "../database/sequelizeDbConnection.mjs"

class UserRole extends Model {}
UserRole.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }
    }
}, {
    sequelize: ecoDb,
    timestamps: true,
    modelName: 'UserRole',
    tableName: 'usersroles',
    indexes: [
        {
            unique: true,
            fields: ['userId', 'roleId'] // this ensures unique records
        }
    ]
});
export default UserRole;

export async function syncUserRoleDb() {
    try {
        // Check if the table exists
        const [results] = await ecoDb.query(
            "SELECT * FROM information_schema.tables WHERE table_name = 'usersroles';"
        );
  
        if (results.length > 0) {
            console.log('usersroles table already exists.');
        } else {
            // Table does not exist, sync it
            await UserRole.sync();
            console.log('usersroles table created and synced.');
        }
    } catch (err) {
        console.error('Error checking table existence:', err);
    }
}