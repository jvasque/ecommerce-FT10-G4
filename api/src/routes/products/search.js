const express = require('express');
const router = require('express').Router();
const { Sequelize } = require('sequelize');
const { Product, Promotion, User, Review, OrderDetail, UnitsOnLocation, Category, SubCategory, Favorite, Wishlist, Brand, Types  } = require('../../db.js');

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
      },
      include: User,
      include: Review,
      include: OrderDetail,
      include: UnitsOnLocation,
      include: Category,
      include: SubCategory,
      include: Favorite,
      include: Wishlist,
      include: Brand,
      include: Types,
      include: {
        model: Promotion,
        where:{
          active: true,
        },
        required: false
      }

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
