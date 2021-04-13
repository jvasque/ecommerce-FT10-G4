const { sequelize , DataTypes } = require('sequelize')
const crypto = require('crypto')
const db = require('../db.js')

module.exports = (sequelize) => {
 
const User = sequelize.define("user", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    vendorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        secondaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        get(){
            return() => this.getDataValue('password')
        }
    },
    salt: {
        type: DataTypes.STRING,
        get() {
            return() => this.getDataValue('salt')
        }
    },    
    type: {
        type: DataTypes.ENUM("admin", "user", "guest"),
        allowNull: false,
    },
    givenName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },    
    googleId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    photoURL: {
        type: DataTypes.STRING,
        allowNull: true,
    }    
})

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
const setSaltAndPassword = user => {
    if (user.changed('password')) {
        user.salt = User.generateSalt()
        user.password = User.encryptPassword(user.password(), user.salt())
    }
}
User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

User.prototype.correctPassword = function(enteredPassword) {
    return User.encryptPassword(enteredPassword, this.salt()) === this.password()
}
}
// correctPassword will only return true if the entered password encrypts to the same value as the saved password,
//  meaning the users plaintext password is never saved or checked against!