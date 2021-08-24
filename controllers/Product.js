const productModel = require("../models/product");
const Order = require("./Order");

class Product {
    static async getAll(req, res) {
        try {
            const products = await productModel.findAll();

            return res.json({
                status: 200,
                data: products,
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
            const product = await productModel.findOne({
                where: { id: req.params.id },
            });

            if(!product) {
                return res.status(404).json({
                    status: 404,
                    error: 'El producto seleccionado no existe'
                })
            }

            return res.json({
                status: 200,
                data: product
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            });
        }
    }

    static async create(req, res) {
        const { code, name, price } = req.body;

        if(!code || !name || !price) {
            return res.status(422).json({
                status: 422,
                message: "Todos los campos son requeridos"
            });
        }

        try {
            const createProduct = await productModel.create(
                { code, name, price },
                { fields: ['code', 'name', 'price'] }
            );

            return res.status(201).json({
                status: 201,
                message: 'Producto creado exitosamente'
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            });
        }
    }

    static async updateById(req, res) {
        const { code, name, price } = req.body
        
        try {
            const product = await productModel.findOne({
                where: { id: req.params.id },
            })

            if(!product) {
                return res.status(404).json({
                    status: 404,
                    error: 'El producto seleccionado no existe'
                })
            }

            product.code = code ? code : product.code;
            product.name = name ? name : product.name;
            product.price = price ? price : product.price;
    
            await product.save();
    
            return res.json({
                status: 200,
                message: 'Producto editado correctamente'
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            });
        }
    }

    static async deleteById(req, res) {
        try {
            const product = await productModel.findOne({
                where: { id: req.params.id },
            })

            if(!product) {
                return res.status(404).json({
                    status: 404,
                    error: 'El producto seleccionado no existe'
                })
            }

            product.destroy()

            return res.status(202).json({
                status: 202,
                message: 'Producto eliminado exitosamente'
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            });
        }
    }
}

module.exports = Product;
