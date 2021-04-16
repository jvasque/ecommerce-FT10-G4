const router = require("express").Router();
const bodyParser = require("body-parser");
const reviewsGet = require("./reviewsGet");
const reviewsPost = require("./reviewsPost");

router.use(bodyParser.json());

router.get("/", reviewsGet);
router.post("/", reviewsPost);

module.exports = router;