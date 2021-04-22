const bodyParser = require("body-parser");
const putOrder = require("./putOrder");
const deleteOrder = require("./deleteOrder");
const addOrder = require("./addOrder");
const allOrders = require("./allOrders");
const orderStatus = require("./orderStatus");
const router = require("express").Router();
router.use(bodyParser.json());

router.delete("/user/:id", deleteOrder);
router.post("/orders/", addOrder);
router.put("/orders/:id", putOrder);
router.get("/users/orders", allOrders);
router.put("/:id/state", orderStatus);

module.exports = router;
