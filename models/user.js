var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      firstName: { type: Sequelize.STRING, allowNull: true },
      lastName: { type: Sequelize.STRING, allowNull: true },
      email: { type: Sequelize.STRING, allowNull: true },
      password: { type: Sequelize.STRING, allowNull: true }
    },
    {
      timestamps: false
    }
  );

  User.associate = function(models) {
    models.User.hasMany(models.Deal);
    models.User.hasMany(models.Contact);
  };

  return User;
};
