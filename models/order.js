const { DataTypes } = require('sequelize');
const connection = require('../connection');
const userModel = require('./user');
const statusModel = require('./statuses');

const model = connection.define(
    'orders',
    {
        date: {
            type: DataTypes.DATE
        },
        total_price: {
            type: DataTypes.FLOAT
        },
        payment: {
            type: DataTypes.STRING
        },
        statuses_id: {
            type: DataTypes.INTEGER
        },
        users_id: {
            type: DataTypes.INTEGER
        }
    },
    {timestamps: false}
);

model.belongsTo(statusModel, {as: 'status', foreignKey: 'statuses_id'});
model.belongsTo(userModel, {as: 'user', foreignKey: 'users_id'});
module.exports = model;