const express = require('express')
const router = require("express").Router();

// Middlewares
router.use(express.json());

const enviarEmail = require('./../../handlers/email');

const newsLetterEmail = require('./email');
const suscripcion = require('./suscripcion');
const primerNewsLetter = require("./primerNewsLetter");
const desuscribir = require("./desuscribir");

router.post('/email', newsLetterEmail);
router.get('/suscripcion', suscripcion);
router.get("/primerNewsLetter", primerNewsLetter);
router.get("/desuscribir", desuscribir);

module.exports = router;