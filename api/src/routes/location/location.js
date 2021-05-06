const express = require('express');
const router = require('express').Router();
const locationGet = require('./locationGet');
const locationGetId = require('./locationGetId');
const locationDelete = require('./locationDelete');
const locationPost = require('./locationPost');
const locationPut = require('./locationPut');
const addProductToLocation = require('./addProductToLocation');
const unitsOnLocationPut = require('./unitsonlocationput');
const removeProductToLocation = require('./removeProductToLocation');
const timeslotsGet = require('./timeslotsGet');
const timeslotsPost = require('./timeslotsPost');

// Middlewares
router.use(express.json());

// Locations routes
router.get('/', locationGet);
router.post('/', locationPost);

router.put('/addproduct/:id', addProductToLocation);
router.put('/unitsonlocation/:id', unitsOnLocationPut);
router.delete('/removeproduct/:id', removeProductToLocation);

router.put('/:id', locationPut);
router.post('/delete/:id', locationDelete);
router.get('/:id', locationGetId);
router.put('/unitsonlocation/:id', unitsOnLocationPut);
// timeslot routes
router.get('/:id/timeslots', timeslotsGet);
router.post('/:id/timeslots', timeslotsPost);

module.exports = router;
