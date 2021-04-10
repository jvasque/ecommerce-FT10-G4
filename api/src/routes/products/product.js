const router = require("express").Router();
const bodyParser = require("body-parser");
const productGet = require("./productGet");
const productGetId = require("./productGetId");
const productPost = require("./productPost");
const productPutId = require("./productPutId");
const productDeleteID = require("./productDeleteId");
const productAddCategory = require("./productAddCategory");
const productDeleteCategory = require("./productDeleteCategory");

router.use(bodyParser.json());

router.get("/", productGet);
router.get("/:id", productGetId);
router.post("/", productPost);
router.put("/:id", productPutId);
router.delete("/:id", productDeleteID);
router.post("/:id/:categoryId", productAddCategory);
router.delete("/:id/:categoryId", productDeleteCategory);

module.exports = router;
