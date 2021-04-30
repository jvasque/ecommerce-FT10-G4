const bodyParser = require("body-parser");
const promotionsGet = require("./promotionsGet");
const promotionsPost = require("./promotionsPost");
const promotionsPut = require("./promotionsPut");
const promotionsDelete = require("./promotionsDelete");
const promotionsGetId = require("./promotionsGetId");

const router = require("express").Router();
router.use(bodyParser.json());

router.get("/", promotionsGet);
router.post("/", promotionsPost);
router.get("/:id", promotionsGetId);
router.put("/:id", promotionsPut);
router.delete("/:id", promotionsDelete);

module.exports = router;