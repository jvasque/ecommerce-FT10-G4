const express = require("express");
const router = require("express").Router();
const passport = require("passport");
const {
  User,
  Newsletter,
  Product,
  Category,
  Wishlist,
} = require("../../db.js");
const { HandlerEmail } = require("./email/handlerEmail.js");
const { InfoEmail } = require("./email/InfoEmail.js");

const options = require("./options.js");
const suscribe = require("./suscribe.js");
const stock = require("./stock.js");
const historial = require("./historial.js");

// Middlewares
router.use(express.json());

// User routes
router.get("/", passport.authenticate("bearer", { session: false }), options);
router.post(
  "/suscribe",
  passport.authenticate("bearer", { session: false }),
  suscribe
);
router.post("/stock", stock);



router.get("/historial", historial);
module.exports = router;
