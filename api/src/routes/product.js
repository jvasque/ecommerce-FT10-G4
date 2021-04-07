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

router.get('/:id', async(req, res, next) => {
	var code = req.params.id;
	var product = await Product.findOne({
		where:{
			productId: code
		}
	})
    if (product){
        res.status(200)
		res.json(product)
	}else{
		res.status(400)
		res.send("that product cannot be find")
	}
});

module.exports = router;
