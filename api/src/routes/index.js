const { Router } = require("express");
// import all routers;
const addCategory = require("./categories/addCategory");
const allCategories = require("./categories/allCategories");
const deleteCategory = require("./categories/deleteCategory");
const putCategory = require("./categories/putCategory");
const products = require("./products/product");
const search = require("./products/search");
const users = require("./users/user");
const cors = require("cors");
const cart = require("./cart/orderDetail/cart");
const order = require("./order/orders");
const reviews = require("./reviews/reviews")
const { route } = require("./products/product");

const router = Router();
router.use(cors());

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/addCategory", addCategory);
router.use("/deleteCategory", deleteCategory);
router.use("/putCategory", putCategory);
router.use("/allCategories", allCategories);
router.use("/products/:id/review", reviews);
router.use("/products", products);
router.use("/search", search);
router.use("/users", users);
router.use("/cart", cart);
router.use("/order", order);

module.exports = router;
