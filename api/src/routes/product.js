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

module.exports = router;
