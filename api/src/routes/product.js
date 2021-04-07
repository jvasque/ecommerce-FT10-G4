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
		return res.send("that product cannot be find")
	}
});

module.exports = router;
