const router = require('express').Router();
const bodyParser = require('body-parser');
const productGet = require('./productGet');
const productGetId = require('./productGetId');
const productGetMany = require('./manyProductsGet');
const productGetHigher = require('./higherProductsGet');
const productPost = require('./productPost');
const productPutId = require('./productPutId');
const productDeleteID = require('./productDeleteId');
const productAddCategory = require('./productAddCategory');
const productDeleteCategory = require('./productDeleteCategory');
const reviewGet = require('./reviewsGet');
const reviewPost = require('./reviewsPost');
const reviewDelete = require('./reviewsDelete');
const reviewPut = require('./reviewsPut');
const reviewOrderDetail = require('./reviewOrderDetail');
const reviewAverage = require('./reviewAverage');
const cfrs = require('./cfrs')
const cbrs = require('./cbrs')
const cfrsPredictions = require('./cfrsPredictions')
const cbrsPredictions = require('./cbrsPredictions')
const passport = require('passport');

router.use(bodyParser.json());

router.get('/', productGet);
router.post('/filter', productGetMany);
router.get('/featured', cfrs) //ml
router.get('/featuredPredictions', cfrsPredictions) //ml
router.get('/higher', productGetHigher);
router.get('/recommended', cbrs) //ml
router.get('/recommendedPredictions', cbrsPredictions) //ml
router.get('/:id', productGetId);
router.get('/:id/review', reviewGet);
router.get('/:id/review-order-details/', reviewOrderDetail);
router.get('/:id/review-product-score', reviewAverage);
router.put(
  '/:id/review',
  passport.authenticate('bearer', { session: false }),
  reviewPut
);
router.put('/:id', productPutId);
router.post('/', productPost);
router.post(
  '/:id/review',
  passport.authenticate('bearer', { session: false }),
  reviewPost
);
router.post('/:id/:categoryId', productAddCategory);
router.delete(
  '/:id/review',
  passport.authenticate('bearer', { session: false }),
  reviewDelete
);
router.delete('/:id', productDeleteID);
router.delete('/:id/:categoryId', productDeleteCategory);

module.exports = router;
