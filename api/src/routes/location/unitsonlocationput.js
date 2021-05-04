const { Location, Product, UnitsOnLocation } = require('../../db.js');

module.exports = async (req, res) => {
  const id = req.params.id;
 

  const {
    productId,
    stock
  } = req.body;

  

  try {
  
      const UOL = await UnitsOnLocation.findOne({
        where: {
          productId: productId,
          locationId: parseInt(id)
        },
      });
      if(UOL){

          if (stock) await UOL.update({ unitsOnStock: stock });
      }
      UOL.save()
      console.log(UOL)
    return res.json(UOL);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};