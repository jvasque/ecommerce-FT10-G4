const express = require("express");
const router = require("express").Router();
// const {
//   User,
//   Order,
//   OrderDetail,
//   Product,
//   PaymentMethod,
// } = require("../../db");

// const {
//   SECRET_KEY,
  
// } = process.env;
// const jwt = require("jsonwebtoken");

const passport = require("passport");
const changeType = require("./changeType");
const getAll = require("./getAll");
const changeStatus = require("./changeStatus");
const getInfo = require("./getInfo");
const doubleAuth = require("./doubleAuth");

// Middlewares
router.use(express.json());

// User routes
router.get("/", passport.authenticate("bearer", { session: false }), getAll);
router.get(
  "/info/:id",
  passport.authenticate("bearer", { session: false }),
  getInfo
);
router.put(
  "/promote/:id",
  passport.authenticate("bearer", { session: false }),
  changeType
);
router.put(
  "/delete/:id",
  passport.authenticate("bearer", { session: false }),
  changeStatus
);

router.post(
  "/doubleAuth",
  passport.authenticate("bearer", { session: false }),
  doubleAuth
);

module.exports = router;
