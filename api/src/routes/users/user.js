const router = require('express').Router();
const bodyParser = require('body-parser');
const userGet = require('./userGet');
const userPost = require('./userPost');
const userWishlist = require('./wishlistGet');
const deleteWishlist = require("./wishlistDelete");

router.use(bodyParser.json());

router.get('/:id/wishlist/:name', userWishlist);
router.delete('/:id/wishlist/:name/:productId/delete', deleteWishlist)
router.get("/:id/", userGet);
router.post("/post", userPost);


module.exports = router;
