const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Table = require('./tableModel');

const Card = sequelize.define('Card', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    tableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Table,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'cards',
    timestamps: false
});

Card.belongsTo(Table, { foreignKey: 'tableId' });
Table.hasMany(Card, { foreignKey: 'tableId' });

module.exports = Card;
