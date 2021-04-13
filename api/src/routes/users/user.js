const router = require("express").Router();
const bodyParser = require("body-parser");
const userGet = require("./userGet");

router.use(bodyParser.json());

router.get("/", userGet);

module.exports = router;