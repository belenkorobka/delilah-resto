const orderModel = require("../models/order");
const orderProductModel = require('../models/order_product');
const productModel = require('../models/product');

class Order {
    static async getAll(req, res) {
        try {
            const orders = await orderModel.findAll({
                attributes: {
                    exclude: ['users_id', 'statuses_id']
                },
                include: ['status', 'user']
            });

            for (let i = 0; i < orders.length; i++) {
                const orderProduct = await orderProductModel.findAll({
                    where: { orders_id: orders[i].id },
                    attributes: {
                        exclude: ['orders_id', 'products_id']
                    },
                    include: ['product']
                });

                orders[i].setDataValue('products', orderProduct);               
            }       

            return res.json({
                status: 200,
                data: orders,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error,
            });
        }
    }

    static async getById(req, res) {
        try {
            const order = await orderModel.findOne({
                where: { id: req.params.id },
                attributes: {
                    exclude: ['users_id', 'statuses_id']
                },
                include: ['status', 'user']
            });

            if(!order) {
                return res.status(404).json({
                    status: 404,
                    error: 'La orden seleccionada no existe'
                });
            }

            const orderProduct = await orderProductModel.findAll({
                where: { orders_id: req.params.id },
                attributes: {
                    exclude: ['orders_id', 'products_id']
                },
                include: ['product']
            });

            order.setDataValue('products', orderProduct);

            return res.json({
                status: 200,
                order: order,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            });
        }
    }

    static async create(req, res) {
        const { products, payment } = req.body

        if(!products || !payment) {
            return res.status(422).json({
                status: 422,
                message: "Todos los campos son requeridos"
            });
        }
 
        try {
            const createdOrder = await orderModel.create(
                { date: new Date(), payment, statuses_id: 1, users_id: req.user.id },
                { fields: ['date', 'payment', 'statuses_id', 'users_id'] }
            );

            let total = 0

            for (let i = 0; i < products.length; i++) {
                const orderProduct = await orderProductModel.create(
                    { orders_id: createdOrder.id, products_id: products[i].id, amount: products[i].amount },
                    { fields: ['orders_id', 'products_id', 'amount' ]}
                )

                const productFound = await productModel.findOne({
                    where: { id: products[i].id }
                })

                total += (productFound.price * orderProduct.amount) 
            }

            createdOrder.total_price = total;
            await createdOrder.save();

            return res.status(201).json({
                status: 201,
                message: 'Pedido creado exitosamente'
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            });
        }
    }

    static async myOrders(req, res) {
        try {
            const orders = await orderModel.findAll({
                where: { users_id:req.user.id },
                attributes: {
                    exclude: ['users_id', 'statuses_id']
                },
                include: ['status', 'user']
            });

            if(!orders) {
                return res.status(404).json({
                    status: 404,
                    error: 'No realisaste ningún pedido'
                });
            }

            for (let i = 0; i < orders.length; i++) {
                const orderProduct = await orderProductModel.findAll({
                    where: { orders_id: orders[i].id },
                    attributes: {
                        exclude: ['orders_id', 'products_id']
                    },
                    include: ['product']
                });

                orders[i].setDataValue('products', orderProduct);               
            }   

            return res.json({
                status: 200,
                data: orders
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            });
        }
    }

    static async updateStatus(req, res) {
        const { status_id } = req.body

        if(!status_id) {
            return res.status(422).json({
                status: 422,
                message: "El campo status es requerido"
            });
        }

        try {
            const order = await orderModel.findOne({
                where: { id: req.params.id },
            })

            if(!order) {
                return res.status(404).json({
                    status: 404,
                    error: 'El producto seleccionado no existe'
                })
            }

            order.statuses_id = status_id;
            await order.save();
    
            return res.json({
                status: 200,
                message: 'Estado del pedido actualizado correctamente'
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            });
        }
    }
}

module.exports = Order;