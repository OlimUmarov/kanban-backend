const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Workspace = require('./workspaceModel');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 30]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
}, {
    tableName: 'users',
    timestamps: false
});

User.hasMany(Workspace, { foreignKey: 'userId' }); 
Workspace.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;
