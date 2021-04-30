const express = require('express');
const router = require('express').Router();
const passport = require('passport');
const enviarEmail = require("./email");

// Middlewares
router.use(express.json());

// User routes
router.get('/', async (req, res) => {
    const enviar = await enviarEmail.enviar("Carlos", 1230404, "carlossalazarsilva11@gmail.com", "Holi")
res.json(enviar)
});






module.exports = router;
