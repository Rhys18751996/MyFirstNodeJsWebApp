import User from './sequelizeUser.mjs';
import Role from './sequelizeRole.mjs';
import UserRole from './sequelizeUserRole.mjs';
import { syncUserDb } from "./sequelizeUser.mjs";
import { syncRoleDb } from "./sequelizeRole.mjs";
import { syncUserRoleDb } from "./sequelizeUserRole.mjs";
import ecoDb from '../database/sequelizeDbConnection.mjs';

// Define many-to-many relationship
User.belongsToMany(Role, {
    through: UserRole,
    foreignKey: 'userId',
    otherKey: 'roleId',
    as: 'roles'
});
Role.belongsToMany(User, {
    through: UserRole,
    foreignKey: 'roleId',
    otherKey: 'userId',
    as: 'users'
});

export { User, Role, UserRole };


export async function syncDb() {
    try {
        await syncUserDb();
        await syncRoleDb();
        await syncUserRoleDb();
        await ecoDb.sync();
        console.log('ecoDb synced');
    }
    catch(err) {
        console.log(err);
    }
}

// 
export async function createDefaultRolesAndAdminUser() {
    try {
        // if 'admin' role doesnt exist in the database, create one (save it's id for later)

        // if 'user' role doesnt exist in the database, create one (save it's id for later)

        // if no user exists in the database, create a default admin user
        /*
        INSERT INTO users (username, email, password, name, phone_number, address, "createdAt", "updatedAt")
        VALUES ('johnny', 'john.doe@example.com', '1234', 'John Doe', '1234567890', '123 Main St, Anytown, Aus', NOW(), NOW());
        */
        console.log('default user created');
    }
    catch(err) {
        console.log(err);
    }
}