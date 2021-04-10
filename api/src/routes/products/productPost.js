const { Product } = require('../../db.js');

module.exports =  async (req, res) => {

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
}