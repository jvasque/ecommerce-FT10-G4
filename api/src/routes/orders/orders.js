const bodyParser = require("body-parser");
const adminOrders = require("./adminOrders");

const router = require("express").Router();
router.use(bodyParser.json());

router.get("/", adminOrders);

module.exports = router;
