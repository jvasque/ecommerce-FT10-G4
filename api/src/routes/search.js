const express = require('express');
const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Product } = require('../db.js');

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
      }, include: {all: true}
    });
    return data.length > 0
      ? res.json(data)
      : res.json([]);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
});

module.exports = router;
