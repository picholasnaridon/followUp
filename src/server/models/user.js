var Sequelize = require("sequelize");
var bcrypt = require('bcrypt-nodejs');


module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstname: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    lastname: {
      type: Sequelize.STRING,
      notEmpty: true
    },
    username: {
      type: Sequelize.TEXT
    },
    phone: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastLogin: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  })
  User.prototype.comparePassword = function (passw, cb) {
      bcrypt.compare(passw, this.password, function (err, isMatch) {
          if (err) {
              return cb(err);
          }
          cb(null, isMatch);
      });
    }
  
  User.associate = function (models) {
    models.User.hasMany(models.Deal);
    models.User.hasMany(models.Comment);
    models.User.hasMany(models.Contact);
    models.User.hasMany(models.Company);
  };

  return User;
};
