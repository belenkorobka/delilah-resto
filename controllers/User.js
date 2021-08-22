const jwt = require('jsonwebtoken');
const userModel = require("../models/user");

class User {
    static async getAll(req, res) {
        try {
            const users = await userModel.findAll({
                attributes: {
                    exclude: ['password', 'roles_id']
                },
                include: ['role']
            });

            return res.json({
                status: 200,
                data: users,
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
            const user = await userModel.findOne({
                where: { id: req.params.id },
                attributes: {
                    exclude: ['password', 'roles_id']
                },
                include: ['role']
            });

            if(!user) {
                return res.status(404).json({
                    status: 404,
                    error: 'El usuario seleccionado no existe'
                })
            }

            return res.json({
                status: 200,
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            });
        }
    }
    
    static async create(req, res) {
        const { fullname, username, email, password, phone, address } = req.body;

        if(!fullname || !username || !email || !password || !phone || !address) {
            return res.status(422).json({
                status: 422,
                error: "Todos los campos son requeridos"
            });
        }

        try {
            const checkEmail = await userModel.findOne({
                where: { email }
            });

            const checkUsername = await userModel.findOne({
                where: { username }
            })

            if(checkEmail) {
                return res.status(400).json({
                    status: 400,
                    error: "Ya existe un usuario con este email"
                })
            }

            if(checkUsername) {
                return res.status(400).json({
                    status: 400,
                    error: "Ya existe un usuario con este nombre de usuario"
                }) 
            }

            const createProduct = await userModel.create(
                { fullname, username, email, password, phone, address, roles_id: 2 },
                { fields: ['fullname', 'username', 'email', 'password', 'phone', 'address', 'roles_id'] }
            );

            return res.status(201).json({
                status: 201,
                message: 'Usuario creado exitosamente'
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            });
        }
    }

    static async login(req, res) {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(422).json({
                status: 422,
                error: "Todos los campos son requeridos"
            });
        }

        try {
            const user = await userModel.findOne({
                include: ['role'],
                where: {
                    username,
                    password
                }
            });
            if (!user) {
                return res.status(401).json({
                    status: 401,
                    error: 'Usuario o contraseña incorrecta'
                })
            }
            const token = jwt.sign({
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role.name
                }
            }, process.env.JWT_SECRET);
            return res.json({
                status: 200,
                token,
                admin: user.role.name === 'admin'
            });
        } catch {
            return res.status(500).json({
                status: 500,
                error
            });
        }
    }

    static async me(req, res){
        try {
            const user = await userModel.findOne({
                where: {id:req.user.id},
                attributes: {
                    exclude: ['password', 'roles_id']
                },
                include: ['role']
            });
            return res.json({
                status: 200,
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            });
        }
    }

}

module.exports = User;