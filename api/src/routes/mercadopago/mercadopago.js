const router = require("express").Router();
var mercadopago = require("mercadopago");
mercadopago.configure({
  access_token:
    "TEST-6314881473504412-041618-63661bf4d27675dedd43cb65bd487f2f-255887181",
});

router.post("/", async (req, res) => {
  const { totalPrice, title } = req.body;
  var preference = {
    items: [
      {
        title: title,
        quantity: 1,
        unit_price: parseInt(totalPrice),
      },
    ],
    back_urls: {
      success: "http://localhost:3000/",
      failure: "http://localhost:3000/",
      pending: "http://localhost:3000/",
    },
    auto_return: "approved",
  };

  const link = await mercadopago.preferences.create(preference);
  res.json({ url: link.body.init_point });
});

module.exports = router;
