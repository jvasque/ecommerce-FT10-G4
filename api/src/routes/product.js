const router = require('express').Router();
const { Product } = require('../db.js');

router.get('/', (req, res, next) => {
	/* Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next); */

	res.json({product: 'Confirmado product'})
});

module.exports = router;
