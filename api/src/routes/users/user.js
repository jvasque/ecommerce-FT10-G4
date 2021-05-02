const express = require("express");
const router = require("express").Router();
const userGet = require("./userGet");
const userPost = require("./userPost");
const fbUserLogin = require("./fbUserGet");
const userPut = require("./userPut");
const userOrderHistory = require("./getOrderHistory");
const passport = require("passport");
const wishlistGet = require("./wishlistGet");
const wishlistPost = require("./wishlistPost");
const wishlistPut = require("./wishlistPut");
const wishlistDelete = require("./wishlistDelete");
const getUserId = require("./getUserId");

// Middlewares
router.use(express.json());

// User routes
router.get("/", userGet);
router.get("/facebook/:id", fbUserLogin);
router.post("/post", userPost);
router.put("/update/:id", userPut);
router.get("/user/:id", getUserId);

router.get("/:id/orders", userOrderHistory);

// User Wishlists routes
router.get("/wishlist", wishlistGet); // Devolver las wishlist de un usuario (?user)
router.post("/wishlist/post/:userId", wishlistPost); // Crear una wishlist
router.delete("/wishlist/delete/:wishlistId", wishlistDelete); // Borrar una wishlist
router.put("/wishlist/:wishlistId/:productId", wishlistPut); // Modificar productos (borrar o agregar)

module.exports = router;
