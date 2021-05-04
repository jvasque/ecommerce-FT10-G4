const express = require('express');
const router = require('express').Router();
const locationGet = require('./locationGet');
const locationGetId = require('./locationGetId');
const locationDelete = require('./locationDelete');
const locationPost = require('./locationPost');
const locationPut = require('./locationPut');
const unitsOnLocationPut = require('./unitsonlocationput')

// Middlewares
router.use(express.json());

// User routes
router.get('/', locationGet);
router.post('/', locationPost);
router.put('/:id', locationPut);
router.post('/delete/:id', locationDelete);
router.get('/:id', locationGetId)
router.put('/unitsonlocation/:id', unitsOnLocationPut);
 

module.exports = router;
