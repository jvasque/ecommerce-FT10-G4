const { Router } = require('express');
// import all routers;
const addCategory = require('./categories/addCategory');
const allCategories = require('./categories/allCategories');
const deleteCategory = require('./categories/deleteCategory');
const info = require('./categories/info');
const putCategory = require('./categories/putCategory');
const products = require('./product');
const search = require('./search');

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/addCategory', addCategory);
router.use('/deleteCategory', deleteCategory);
router.use('/putCategory', putCategory);
router.use('/allCategories', allCategories);
router.use('/info', info);
router.use('/products', products);
router.use('/search', search);

module.exports = router;
