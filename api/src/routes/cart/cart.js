const bodyParser = require("body-parser");
const addCart = require("./addCart");
const deleteCart = require("./deleteCart");
const putCart = require("./putCart");

const router = require("express").Router();
router.use(bodyParser.json());

router.delete("/user/:id", deleteCart);
router.post("/user/:id", addCart);
router.put("/user/:id", putCart);

module.exports = router;
