const { User } = require("../../db.js");

module.exports = async (req, res, next) => {
  let {
    firstName,
    lastName,
    email,
    companyName,
    phone,
    address,
    city,
    capital,
    street,
    number,
  } = req.body;
  let code = req.params.id;
  const user = await User.findOne({
    where: {
      id: code,
    },
  });
  if (user) {
    if (firstName) await user.update({ firstName: firstName });
    if (lastName) await user.update({ lastName: lastName });
    if (email) await user.update({ email: email });
    // if(password) await user.update({password: password}); //esto no deberia ir en otra ruta?
    if (companyName) await user.update({ companyName: companyName });
    if (phone) await user.update({ phone: phone });
    if (address) await user.update({ address: address });
    if (city) await user.update({ city: city });
    if (capital) await user.update({ capital: capital });
    if (street) await user.update({ street: street });
    if (number) await user.update({ number: number });

    res.status(200);
    return res.json(user);
  } else {
    res.status(400);
    return res.json({ error: "that user cannot be find" });
  }
};
