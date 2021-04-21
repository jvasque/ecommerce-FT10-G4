const bodyParser = require("body-parser");
const adminOrders = require("./adminOrders");
const modifyOrder = require("./modifyOrder");

const router = require("express").Router();
router.use(bodyParser.json());

router.get("/", adminOrders);
router.post('/:id', modifyOrder)

module.exports = router;
