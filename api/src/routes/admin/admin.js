const express = require("express");
const router = require("express").Router();
const {
  User,
  Order,
  OrderDetail,
  Product,
  PaymentMethod,
} = require("../../db");

const passport = require("passport");
const statusPut = require("./statusPut");
const getAll = require("./getAll");

// Middlewares
router.use(express.json());

// User routes
router.get("/", passport.authenticate("bearer", { session: false }), getAll);


router.put("/promote/:id", passport.authenticate("bearer", { session: false }), statusPut );

module.exports = router;
