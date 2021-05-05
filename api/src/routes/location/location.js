const express = require('express');
const router = require('express').Router();
const locationGet = require('./locationGet');
const locationDelete = require('./locationDelete');
const locationPost = require('./locationPost');
const locationPut = require('./locationPut');
const timeslotsGet = require('./timeslotsGet');
const timeslotsPost = require('./timeslotsPost');

// Middlewares
router.use(express.json());

// Locations routes
router.get('/', locationGet);
router.post('/', locationPost);
router.put('/:id', locationPut);
router.post('/delete/:id', locationDelete);

// timeslot routes
router.get('/:id/timeslots', timeslotsGet);
router.post('/:id/timeslots', timeslotsPost);

module.exports = router;
