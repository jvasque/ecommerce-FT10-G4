const server = require("express").Router();
const { User } = require("../db.js");
const passport = require("passport")
const jwt = require("jsonwebtoken")

server.get("/me", async (req, res, next) => {
    try {
        const { id } = req.user;
        const result = await User.findByPk(id);
        //hacer verificacion por email 
        res.json(result);
    } catch (error) {
        next(error);
    }
})

server.post("/login", function (req, res, next) {
    passport.authenticate("local", function (err, user) {
        if(err) return next(err);
        else if(!user) return res.sendStatus(401)
        else return res.send(jwt.sign(user, "secreto"))
    })(req, res, next)
})

module.exports = server;