const router = require("express").Router();
const bodyParser = require("body-parser");
const productGet = require("./productGet");
const productGetId = require("./productGetId");
const productPost = require("./productPost");
const productPutId = require("./productPutId");
const productDeleteID = require("./productDeleteId");
const productAddCategory = require("./productAddCategory");
const productDeleteCategory = require("./productDeleteCategory");
const reviewGet = require("./reviewsGet");
const reviewPost = require("./reviewsPost");
const reviewDelete = require("./reviewsDelete");
const reviewPut = require("./reviewsPut");
const reviewOrderDetail = require("./reviewOrderDetail");

router.use(bodyParser.json());

router.get("/", productGet);
router.get("/:id", productGetId);
router.get("/:id/review", reviewGet);
router.get("/:id/review-order-details/", reviewOrderDetail);
router.put("/:id/review", reviewPut);
router.put("/:id", productPutId);
router.post("/", productPost);
router.post("/:id/review", reviewPost);
router.post("/:id/:categoryId", productAddCategory);
router.delete("/:id/review", reviewDelete);
router.delete("/:id", productDeleteID);
router.delete("/:id/:categoryId", productDeleteCategory);


module.exports = router;
