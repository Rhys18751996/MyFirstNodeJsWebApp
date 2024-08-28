


User.hasMany(UserRole, { foreignKey: 'userId' });
Role.hasMany(UserRole, { foreignKey: 'roleId' });
UserRole.belongsTo(User, { foreignKey: 'userId' });
UserRole.belongsTo(Role, { foreignKey: 'roleId' });