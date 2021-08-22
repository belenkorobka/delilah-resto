require("dotenv").config();
const express = require("express");

const ProductController = require('./controllers/Product');
const UserController = require('./controllers/User');
const OrderController = require('./controllers/Order');
const jwtAdmin = require('./middlewares/jwtAdmin');
const jwtUser = require("./middlewares/jwtUser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ENDPOINTS FOR PRODUCTS
// get all products
app.get('/product', jwtUser, ProductController.getAll);

// get product by id
app.get('/product/:id', jwtUser, ProductController.getById);

// create product
app.post('/product', jwtAdmin, ProductController.create);

// update product by id
app.put('/product/:id', jwtAdmin, ProductController.updateById);

// delete product by id
app.delete('/product/:id', jwtAdmin, ProductController.deleteById);

// ENDPOINTS FOR USERS
// get all users
app.get('/user', jwtAdmin, UserController.getAll);

// get user by id
app.get('/user/:id', jwtAdmin, UserController.getById);

// get user logged in
app.get('/me', jwtUser, UserController.me);

// create user
app.post('/user', UserController.create);

// login
app.post('/login', UserController.login);

// ENDPOINT FOR ORDERS
// create order (USER)
app.post('/order', jwtUser, OrderController.create);

// get all orders (ADMIN)
app.get('/order', jwtAdmin, OrderController.getAll);

// get order by id (ADMIN)
app.get('/order/:id', jwtAdmin, OrderController.getById);

// get orders from user logged in (USER)
app.get('/me/order', jwtUser, OrderController.myOrders);

// update order status by id (ADMIN)
app.put('/order/:id', jwtAdmin, OrderController.updateStatus);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port=${process.env.PORT}`);
});