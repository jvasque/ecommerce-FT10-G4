const { DataTypes } = require('sequelize');
const crypto = require('crypto')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  const User = sequelize.define('user', {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    companyName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      get() {
          return () => this.getDataValue('password')
      }
    },
    salt: {
      type: DataTypes.STRING,
      get() {
          return() => this.getDataValue('salt')
      }
    },
    phone: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
  });

  User.generateSalt = function() {
    return crypto.randomBytes(16).toString('base64')
  }
  
  User.encryptPassword = function(plainText, salt) {
    return crypto
        .createHash('RSA-SHA256')
        .update(plainText)
        .update(salt)
        .digest('hex')
  }
  
  User.prototype.correctPassword = function(enteredPassword) {
    return User.encryptPassword(enteredPassword, this.salt()) === this.password()
  }

  const setSaltAndPassword = user => {
    if (user.changed('password')) {
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password(), user.salt())
    }
  }

  User.addHook('beforeCreate', setSaltAndPassword)
  User.addHook('beforeUpdate', setSaltAndPassword)

}

