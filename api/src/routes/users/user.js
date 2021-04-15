const router = require("express").Router();
const bodyParser = require("body-parser");
const userDelete = require("./userDelete");
const userGet = require("./userGet");
const userLogin = require("./userLogin");

const userPost = require("./userPost");
const userPut = require("./userPut");



router.use(bodyParser.json());



router.get("/", userGet);
router.get('/login', userLogin)
router.post("/post", userPost);
router.put("/update/:id", userPut)


router.put("/delete/:id", userDelete);

module.exports = router;

