const router = require('express').Router();
// const bodyParser = require('body-parser');
const express = require('express');
const userGet = require('./userGet');
const userPost = require('./userPost');
const userDelete = require("./userDelete");
const userGet = require("./userGet");
const userPost = require("./userPost");
const userLogin = require("./userLogin");

const userPut = require("./userPut");
const wishlistGet = require('./wishlistGet');
const wishlistPost = require('./wishlistPost');
const wishlistPut = require('./wishlistPut');
const wishlistDelete = require('./wishlistDelete');

// Middlewares
router.use(express.json());

// User routes
router.get('/', userGet);
router.get('/login', userLogin)
router.post('/post', userPost);
router.put("/update/:id", userPut)
router.put("/delete/:id", userDelete);
// User Wishlists routes
router.get('/wishlist', wishlistGet); // Devolver las wishlist de un usuario (?user)
router.post('/wishlist/post/:userId', wishlistPost); // Crear una wishlist
router.delete('/wishlist/delete/:wishlistId', wishlistDelete); // Borrar una wishlist
router.put('/wishlist/:wishlistId/:productId', wishlistPut); // Modificar productos (borrar o agregar)

module.exports = router;
