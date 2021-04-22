const router = require("express").Router();
const bodyParser = require("body-parser");
const emailBuyConfirmation = require("./emailBuyConfirmation");
const emailOrderNotification = require("./emailOrderNotification");
//proteger las rutas:
const passport = require("passport");


router.use(bodyParser.json());

router.post("/buy-confirmation", passport.authenticate("bearer", { session: false }), emailBuyConfirmation);
router.post("/order-notification", passport.authenticate("bearer", { session: false }), emailOrderNotification);

module.exports = router;
