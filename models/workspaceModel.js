const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');
const Table = require('./tableModel');

const Workspace = sequelize.define('Workspace', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'workspaces',
    timestamps: false
});

Workspace.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Workspace, { foreignKey: 'userId' });

Workspace.hasMany(Table, { foreignKey: 'workspaceId' });
Table.belongsTo(Workspace, { foreignKey: 'workspaceId' });

module.exports = Workspace;
