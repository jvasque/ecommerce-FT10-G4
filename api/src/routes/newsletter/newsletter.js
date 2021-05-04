const express = require("express");
const router = require("express").Router();
const passport = require("passport");
const { User, Newsletter } = require("../../db.js");
const { HandlerEmail } = require("./email/handlerEmail.js");
const { TestEmail } = require("./email/TestEmail.js");
const axios = require("axios");

const options = require("./options.js");
const suscribe = require("./suscribe.js");
const juice = require("juice");

// Middlewares
router.use(express.json());

// User routes
router.get("/", passport.authenticate("bearer", { session: false }), options);
router.post(
  "/suscribe",
  passport.authenticate("bearer", { session: false }),
  suscribe
);

router.post("/prueba", async (req, res) => {
  const product = await axios.get(`http://localhost:3001/products/${1}`);
  console.log(product.data);
  const html = TestEmail('Carlangas');
  const news = await Newsletter.create({
    type: "prueba",
    html: html,
  });
  await HandlerEmail(html, "carlossalazarsilva11@gmail.com", "prueba");
  res.status(200).send(juice(news.html));
});


router.get("/getEmail", async (req, res) => {
  const news = await Newsletter.findAll();
  res.status(200).send(juice(news[0].html));
});
module.exports = router;
