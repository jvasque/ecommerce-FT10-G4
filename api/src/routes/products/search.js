const express = require('express');
const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Product, Promotion } = require('../../db.js');

router.use(express.json());

router.get('/', async (req, res, next) => {
  /// ROUTE search?term=
  let query= req.query.term;

  try {
    let data = await Product.findAll({
      where: {
        name: { 
          [Sequelize.Op.iLike]: `%${query}%`,
        },
      }, include: {all: true},
    });
    return data.length > 0
      ? res.json(data)
      : res.json([{error: "that product cannot be find"}]);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
});

module.exports = router;
