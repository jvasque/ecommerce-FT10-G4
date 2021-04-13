const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("orderDetail", {
    orderDetailId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    productID: {
      type: DataTypes.INTEGER,
    },
  });
};
