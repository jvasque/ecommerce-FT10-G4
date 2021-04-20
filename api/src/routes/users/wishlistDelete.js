// /users/wishlist/delete/:wishlistId

const { Wishlist } = require('../../db.js');

module.exports = async (req, res, next) => {
  const wishlistId = req.params.wishlistId;
  try{
    let wishlist = await Wishlist.findOne({ where: { id: wishlistId } });
    wishlist?wishlist.destroy():null;
    res.json({message:`wishlist ${wishlistId} eliminada`}).status(204)
  }catch(err){
    res.json(err);
    return console.log(err);
  }
};
