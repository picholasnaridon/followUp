var Sequelize = require('sequelize')

module.exports = function (sequelize, DataTypes) {
  var Deal = sequelize.define("Deal", {
    name: { type: Sequelize.TEXT, allowNull: false },
    amount: { type: Sequelize.INTEGER, allowNull: true },
    status: { type: Sequelize.STRING, allowNull: true },
    createdAt: {
      type: Sequelize.STRING,
      defaultValue: '0'
    }
  }, {
    timestamps: false

  });


  Deal.associate = function (models) {
    models.Deal.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    })
    models.Deal.belongsToMany(models.Contact, { through: models.ContactDeal });
  };

  return Deal;
};



