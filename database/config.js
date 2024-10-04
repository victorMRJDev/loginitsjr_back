require('dotenv').config();
const { Sequelize } = require('sequelize');

const db = new Sequelize( process.env.MYSQL_DB_NAME, '372013', 'itsj123',{
    host: process.env.MYSQL_URL,
    dialect: 'mysql',
    dialectModule: require('mysql2'),

});

module.exports = {
    db
}