const bodyParser = require("body-parser");
const addCart = require("./addCart");
const allCart = require("./allCart");
const deleteAll = require("./deleteAll");
const deleteCart = require("./deleteCart");
const putCart = require("./putCart");


const router = require("express").Router();
router.use(bodyParser.json());

router.delete("/:userId/:id", deleteCart);
router.post("/:userId/:id", addCart);
router.put("/user/:id", putCart);
router.get("/:userId/cart", allCart);
router.delete("/:userId/items/delete", deleteAll);



module.exports = router;
