const router = require('express').Router();
const { Product } = require('../db.js');
const bodyParser = require("body-parser");

router.use(bodyParser.json())

router.get('/', async (req, res, next) => {

	try{
		let data = await Product.findAll();
		return res.json({data})
	} catch(err){
		res.json(err)
		return console.log(err)
	}

});


router.post('/', async (req, res) => {

	let { name, SKU, unitPrice, description, picture, score } = req.body;

	try{
		const addProduct = await Product.findOrCreate({
			where: {
				name,
				SKU,
				unitPrice,
				description,
				picture,
				score
			}
		})

		const findProduct = await Product.findOne({
			where: {
				name,
				SKU,
				unitPrice,
				description,
				picture,
				score
			}
		})
	
		return res.json(findProduct)
	} catch(err){
		console.log(err);
		res.json({err: "an error occurred while loading the data"})
	}
	

})

module.exports = router;
