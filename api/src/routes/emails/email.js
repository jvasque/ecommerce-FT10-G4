const router = require("express").Router();
const bodyParser = require("body-parser");
const emailBuyConfirmation = require("./emailBuyConfirmation");
const emailOrderNotification = require("./emailOrderNotification");


router.use(bodyParser.json());

router.post("/buy-confirmation", emailBuyConfirmation);
router.post("/order-notification", emailOrderNotification);

module.exports = router;
