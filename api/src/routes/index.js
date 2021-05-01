const { Router } = require('express');
// import all routers;
const addCategory = require('./categories/addCategory');
const allCategories = require('./categories/allCategories');
const deleteCategory = require('./categories/deleteCategory');
const putCategory = require('./categories/putCategory');

const queryCategory = require('./categories/queryCategory');

const products = require('./products/product');
const search = require('./products/search');
const users = require('./users/user');
const cors = require('cors');
const cart = require('./cart/orderDetail/cart');
const order = require('./order/orders');
const { route } = require('./products/product');
const server = require('./auth');
const mercadopago = require('../routes/mercadopago/mercadopago');
const admin = require('../routes/admin/admin');
const orders = require('../routes/orders/orders');
const email = require('../routes/emails/email');
const newsLetter = require('./users/newsLetter.js');
const promotions = require('./promotions/promotions.js');


const router = Router();
router.use(cors());

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/addCategory', addCategory);
router.use('/deleteCategory', deleteCategory);
router.use('/putCategory', putCategory);
router.use('/allCategories', allCategories);

router.use('/queryCategory', queryCategory)

router.use('/products', products);
router.use('/search', search);
router.use('/users', users);
router.use('/cart', cart);
router.use('/order', order);
router.use('/orders', orders);
router.use('/auth', server);
router.use('/cart/checkout', mercadopago);
router.use('/admin', admin);
router.use('/email', email);
router.use('/newsLetter', newsLetter);
router.use('/promotions', promotions);


module.exports = router;