const router = require("express").Router();
const bodyParser = require("body-parser");
const userGet = require("./userGet");
const userPost = require("./userPost");
const userWishlist = require("./getWishlist")

router.use(bodyParser.json());


router.get('/:id/wishlist', userWishlist)
router.get("/:id/", userGet);
router.post("/post", userPost);


module.exports = router;

