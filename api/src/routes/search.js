const express = require('express');
const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Product } = require('../db.js');

router.use(express.json());

router.get('/', async (req, res, next) => {
  /// ROUTE search?term=

  let first = req.query.term.toLowerCase();
  const query = first[0].toUpperCase() + first.slice(1);

  try {
    let data = await Product.findAll({
      where: {
        name: { [Sequelize.Op.like]: `%${query}%` },
      },
    });
    return data.length > 0
      ? res.json(data)
      : res.send('No results found for that search.');
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
});

module.exports = router;
