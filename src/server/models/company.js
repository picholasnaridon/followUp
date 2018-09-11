var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var Company = sequelize.define(
    "Company",
    {
      name: { type: Sequelize.TEXT, allowNull: false },
      email: { type: Sequelize.TEXT, allowNull: true },
      address1: { type: Sequelize.TEXT, allowNull: true },
      address2: { type: Sequelize.TEXT, allowNull: true },
      City: { type: Sequelize.TEXT, allowNull: true },
      State: { type: Sequelize.TEXT, allowNull: true },
      Zip: { type: Sequelize.TEXT, allowNull: true },
      Phone: { type: Sequelize.TEXT, allowNull: true },
      fax: { type: Sequelize.TEXT, allowNull: true }
    },
    {
      timestamps: false
    }
  );

  Company.associate = function (models) {
    models.Company.hasMany(models.Contact);
    models.Company.hasMany(models.Deal);
    models.Company.belongsTo(models.User);
  };

  return Company;
};
