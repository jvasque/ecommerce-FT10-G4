const router = require("express").Router();
const bodyParser = require("body-parser");
const userDelete = require("./userDelete");
const userGet = require("./userGet");

const userPost = require("./userPost");
const userPut = require("./userPut");



router.use(bodyParser.json());



router.get("/", userGet);
router.post("/post", userPost);
router.put("/update/:id", userPut)

//admin routes 
router.delete("/admin/delete/:id", userDelete);

module.exports = router;

