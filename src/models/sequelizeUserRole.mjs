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
        await UserRole.sync();
        console.log('usersroles table synced');
    }
    catch(err) {
        console.log(err);
    }
}