const router = require("express").Router();
const bodyParser = require("body-parser");
const userGet = require("./userGet");

const userPost = require("./userPost");



router.use(bodyParser.json());



router.get("/", userGet);
router.post("/post", userPost);

module.exports = router;

