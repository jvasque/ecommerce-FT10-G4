const { Location, Product, UnitsOnLocation } = require('../../db.js');

module.exports = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  console.log(req.body, "EL BODYYY VOOO")

  const {
    productId,
    stock
  } = req.body;

  try {
    
      const UOL = await UnitsOnLocation.findOne({
        where: {
          productId: productId,
          locationId: id
        },
      });
      if(UOL){

          if (stock) await UOL.update({ unitsOnStock: stock });
      }

    return res.json(UOL);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};