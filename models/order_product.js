const { DataTypes } = require('sequelize');
const connection = require('../connection');
const orderModel = require('./order');
const productModel = require('./product');

const model = connection.define(
    'orders_products',
    {
        orders_id: {
            type: DataTypes.INTEGER
        },
        products_id: {
            type: DataTypes.INTEGER
        },
        amount: {
            type: DataTypes.INTEGER
        }
    },
    {timestamps: false}
);
model.removeAttribute('id');
model.belongsTo(orderModel, {as: 'order', foreignKey: 'orders_id'});
model.belongsTo(productModel, {as: 'product', foreignKey: 'products_id'});
module.exports = model;