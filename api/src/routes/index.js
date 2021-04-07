const { Router } = require('express');
// import all routers;
//const productRouter = require('./product.js');


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

router.get('/', function(req, res) { // Aca tengo que hacer algo con el home, o no?
  
    res.json({prueba: 'estas en /'})
  
});


module.exports = {
    product: require('./product'),
    index: router,
};
