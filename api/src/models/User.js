const { DataTypes } = require("sequelize");
const crypto = require("crypto");
const db = require("../db.js");

module.exports = (sequelize) => {
  const User = sequelize.define("user", {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    registrationToken: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return () => this.getDataValue("password");
      },
    },
    salt: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue("salt");
      },
    },
    type: {
      type: DataTypes.ENUM("superadmin", "admin", "user", "guest"),
      defaultValue: "user",
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    recoveryToken: {
      type: DataTypes.INTEGER,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
    },
    resetPassword: {
      type: DataTypes.BOOLEAN,
    },
    facebookUser: {
      type: DataTypes.STRING,
      unique: true,
    },
    googleUser: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    linkedinUser: {
      type: DataTypes.STRING,
      unique: true,
    },
    photoURL: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  User.generateSalt = function () {
    return crypto.randomBytes(16).toString("base64");
  };
  User.encryptPassword = function (plainText, salt) {
    return crypto
      .createHash("RSA-SHA256")
      .update(plainText)
      .update(salt)
      .digest("hex");
  };
  const setSaltAndPassword = (user) => {
    if (user.changed("password")) {
      user.salt = User.generateSalt();
      user.password = User.encryptPassword(user.password(), user.salt());
    }
  };
  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);

  User.prototype.correctPassword = function (enteredPassword) {
    return (
      User.encryptPassword(enteredPassword, this.salt()) === this.password()
    );
  };
};
// correctPassword will only return true if the entered password encrypts to the same value as the saved password,
//  meaning the users plaintext password is never saved or checked against!
