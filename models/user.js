var Sequelize = require('sequelize')


module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    email: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },

  });

  User.associate = function (models) {
    models.User.hasMany(models.Deal);
    models.User.hasMany(models.Contact);

  };



  return User;
};



