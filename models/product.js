const { DataTypes } = require('sequelize');
const connection = require('../connection');

const model = connection.define(
    'products',
    {
        code: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.FLOAT
        }
    },
    {timestamps: false}
);

module.exports = model;