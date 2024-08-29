import { Role } from "../models/index.mjs";

export async function getRoles() {
    try {
        let roles = await Role.findAll({ });
        return roles.map(roles => roles.get({ plain: true }));
    } catch (err) {
        console.error('Error fetching roles:', err);
        return [];
    }
}