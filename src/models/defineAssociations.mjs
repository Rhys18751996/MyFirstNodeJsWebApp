import User from "../models/sequelizeUser.mjs"
import Role from "../models/sequelizeRole.mjs"
import UserRole from "../models/sequelizeUserRole.mjs"

export async function setUserRoleAssociations() {
    try {
        await User.belongsToMany(Role, { through: UserRole });
        await Role.belongsToMany(User, { through: UserRole });
        
        await User.hasMany(UserRole, { foreignKey: 'userId' });
        await Role.hasMany(UserRole, { foreignKey: 'roleId' });
        await UserRole.belongsTo(User, { foreignKey: 'userId' });
        await UserRole.belongsTo(Role, { foreignKey: 'roleId' });
        console.log("users, roles and usersroles references are set")
    }
    catch(err) {
        console.log(err);
    }
}
