const router = require("express").Router();
const bodyParser = require("body-parser");
const reviewsGet = require("./reviewsGet");

router.use(bodyParser.json());

router.get("/:id/review", reviewsGet);

module.exports = router;