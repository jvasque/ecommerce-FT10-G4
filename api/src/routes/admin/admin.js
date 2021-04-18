const express = require('express')
const router = require("express").Router();

const passport = require("passport");
const statusPut = require('./statusPut');


// Middlewares
router.use(express.json());

// User routes
router.put("/promote/:id",passport.authenticate('bearer', { session: false }), statusPut);

router.get("/",passport.authenticate('bearer', { session: false }), (req,res)=>{
    console.log(req.user)
    res.send('ok')
})







module.exports = router;