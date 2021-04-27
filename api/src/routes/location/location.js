const express = require('express');
const router = require('express').Router();
const locationGet = require('./locationGet');


// Middlewares
router.use(express.json());

// User routes
router.get('/', locationGet);

module.exports = router;
