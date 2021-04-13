const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("order", {
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    productAmount: {
      type: DataTypes.NUMBER,
    },
    productName: {
      type: DataTypes.STRING,
    },
    productId: {
      type: DataTypes.NUMBER,
    },
    quantity: {
      type: DataTypes.NUMBER,
    },
    paymentMethod: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.ENUM({
        values: ["cart", "created", "processing", "cancelled", "completed"],
        allowNull: false,
      }),
    },
  });
};
