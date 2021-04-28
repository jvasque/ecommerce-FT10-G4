const express = require('express');
const router = require('express').Router();
const locationGet = require('./locationGet');
const locationDelete = require('./locationDelete');

// Middlewares
router.use(express.json());

// User routes
router.get('/', locationGet);
router.post('/delete/:id', locationDelete);

module.exports = router;
