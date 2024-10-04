
const { DataTypes } = require ('sequelize');
const {db} = require('../database/config');

const User = db.define('users',{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        tableName: 'users',
        timestamps: false
    }
)
module.exports = {User};