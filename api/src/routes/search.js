const express = require('express');
const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Product } = require('../db.js');

router.use(express.json());

router.get('/', async (req, res, next) => {
  /// ROUTE search?term=

  let first = req.query.term.toLowerCase();
  let second = first.toUpperCase()
  const query = first[0].toUpperCase() + first.slice(1);
  console.log(first, second, query)
  try {
    let data = await Product.findAll({
      where: {
        name: { [Sequelize.Op.or]:{
          [Sequelize.Op.like]: `%${query}%`,
          [Sequelize.Op.like]: `%${first}%`,
          [Sequelize.Op.like]: `%${second}%`,
          [Sequelize.Op.substring]: `%${first}%`,
          [Sequelize.Op.substring]: `%${second}%`,
          [Sequelize.Op.substring]: `%${query}%`,
         }
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
