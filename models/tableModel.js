const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Подключение к базе данных
const Workspace = require('./workspaceModel'); // Импорт модели рабочей области
const Card = require('./cardModel'); // Импорт модели карточек

const Table = sequelize.define('Table', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    workspaceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Workspace,
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
    tableName: 'table', // Название таблицы в базе данных
    timestamps: false // Отключаем автоматическое создание временных полей
});

// Связи с другими моделями
Table.belongsTo(Workspace, { foreignKey: 'workspaceId' }); // Один workspace может иметь несколько table
Workspace.hasMany(Table, { foreignKey: 'workspaceId' });

Table.hasMany(Card, { foreignKey: 'tableId' }); // Один table может иметь несколько card
Card.belongsTo(Table, { foreignKey: 'tableId' });

module.exports = Table;
