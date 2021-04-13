const router = require("express").Router();
const bodyParser = require("body-parser");
const userPost = require("./userPost");


router.use(bodyParser.json());

router.get("/posts", (req, res) => {
    res.send('Ok')
});
router.post("/post", userPost);



module.exports = router;
