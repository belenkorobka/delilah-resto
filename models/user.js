const { DataTypes } = require('sequelize');
const connection = require('../connection');
const roleModel = require('./role');

const model = connection.define(
    'users',
    {
        fullname: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        roles_id: {
            type: DataTypes.INTEGER
        }
    },
    {timestamps: false}
);

model.belongsTo(roleModel, {as: 'role', foreignKey: 'roles_id'});
module.exports = model;