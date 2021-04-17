const { Router } = require("express");
// import all routers;
const addCategory = require("./categories/addCategory");
const allCategories = require("./categories/allCategories");
const deleteCategory = require("./categories/deleteCategory");
const putCategory = require("./categories/putCategory");
const newsLetter = require('./users/newsLetter.js');
const products = require("./products/product");
const search = require("./products/search");
const users = require("./users/user");
const cors = require("cors");
const cart = require("./cart/orderDetail/cart");
const order = require("./order/orders");
const { route } = require("./products/product");
const server = require("../routes/users/auth");
const mercadopago = require("../routes/mercadopago/mercadopago");

const router = Router();
router.use(cors());

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/addCategory", addCategory);
router.use("/deleteCategory", deleteCategory);
router.use("/putCategory", putCategory);
router.use("/allCategories", allCategories);
router.use("/products", products);
router.use("/search", search);
router.use("/users", users);
router.use("/cart", cart);
router.use("/order", order);
router.use("/auth", server);
router.use('/newsLetter', newsLetter);
router.use("/cart/checkout", mercadopago);

module.exports = router;