const router = require("express").Router();
const bodyParser = require("body-parser");
const userGet = require("./userGet");
const userPost = require("./userPost");
const userWishlist = require("./getWishlist")
const userOrderHistory = require("./getOrderHistory")
const increase = require("./increase")

router.use(bodyParser.json());


router.get("/", userGet);
router.get("/:id/orders", userOrderHistory)
router.get("/:id/wishlist", userWishlist)
router.post("/post", userPost);
router.get("/increase", increase)


module.exports = router;

