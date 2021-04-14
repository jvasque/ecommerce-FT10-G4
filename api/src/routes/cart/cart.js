const addCarts = require("./addCarts");
const bodyParser = require("body-parser");

const router = require("express").Router();
router.use(bodyParser.json());

router.get("/", addCarts);

module.exports = router;
