const router = require('express').Router();
const bodyParser = require('body-parser');
const userGet = require('./userGet');
const userPost = require('./userPost');
const userWishlist = require('./wishlistGet');

router.use(bodyParser.json());

router.get('/:id/', userGet);
router.get('/:id/wishlist/:name', userWishlist);
router.post('/post', userPost);

module.exports = router;
