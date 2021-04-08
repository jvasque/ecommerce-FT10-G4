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

router.get('/:id', async(req, res, next) => {
	var code = req.params.id;
	var product = await Product.findOne({
		where:{
			productId: code
		}
	})
    if (product){
        res.status(200)
		return res.json(product)
	}else{
		res.status(400)
		return res.json({error: "that product cannot be find"})
	}
});

router.post('/', async (req, res) => {

	let { name, SKU, unitPrice, description, picture, score, unitsOnStock } = req.body;

	try{
		const addProduct = await Product.findOrCreate({
			where: {
				name,
				SKU,
				unitPrice,
				description,
				picture,
				score,
				unitsOnStock
			}
		})

		const findProduct = await Product.findOne({
			where: {
				name,
				SKU,
				unitPrice,
				description,
				picture,
				score,
				unitsOnStock
			}
		})
	
		return res.json(findProduct)
	} catch(err){
		console.log(err);
		res.json({error: "an error occurred while loading the data"})
	}
})

router.put('/:id', async(req, res, next) => {
	let {name, SKU, unitPrice, description, unitsOnStock} = req.body;
	let code = req.params.id;
	const product = await Product.findOne({
		where:{
			productId: code
		}
	})
    if (product){
		if(name) await product.update({name: name})
		if(SKU) await product.update({SKU: SKU})
		if(unitPrice) await product.update({unitPrice: unitPrice})
		if(description) await product.update({description: description})
		if(unitsOnStock) await product.update({unitsOnStock: unitsOnStock})

        res.status(200)
		return res.json(product)
	}else{
		res.status(400)
		return res.json({error: "that product cannot be find"})
	}
});
module.exports = router;
