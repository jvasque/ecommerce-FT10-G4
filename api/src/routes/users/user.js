const router = require("express").Router();
const bodyParser = require("body-parser");
const userGetAll = require("./userGetAll");
const userPost = require("./userPost");


router.use(bodyParser.json());

router.get("/all", userGetAll);
router.post("/post", userPost);



module.exports = router;
