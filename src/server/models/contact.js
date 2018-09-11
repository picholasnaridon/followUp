var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var Contact = sequelize.define(
    "Contact",
    {
      firstName: { type: Sequelize.TEXT, allowNull: true },
      lastName: { type: Sequelize.TEXT, allowNull: true },
      email: { type: Sequelize.TEXT, allowNull: true },
      address1: { type: Sequelize.TEXT, allowNull: true },
      address2: { type: Sequelize.TEXT, allowNull: true },
      City: { type: Sequelize.TEXT, allowNull: true },
      State: { type: Sequelize.TEXT, allowNull: true },
      Zip: { type: Sequelize.TEXT, allowNull: true },
      Phone: { type: Sequelize.TEXT, allowNull: true },
      Mobile: { type: Sequelize.TEXT, allowNull: true }
    },
    {
      timestamps: false
    }
  );

  Contact.associate = function (models) {
    models.Contact.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Contact.belongsTo(models.Company, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Contact.belongsToMany(models.Deal, {
      through: models.DealContact
    });
    models.Contact.belongsToMany(models.Comment, {
      through: models.ContactComment
    });
  };

  return Contact;
};
