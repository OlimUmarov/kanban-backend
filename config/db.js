const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
});

sequelize.authenticate()
    .then(() => {
        console.log('Успешное подключение к базе данных');
    })
    .catch((error) => {
        console.error('Ошибка подключения к базе данных:', error);
    });

module.exports = sequelize;
