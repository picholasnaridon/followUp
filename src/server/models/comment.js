var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var Comment = sequelize.define(
    "Comment",
    {
      body: { type: Sequelize.TEXT, allowNull: false },

    },
    {
      timestamps: true
    }
  );

  Comment.associate = function (models) {
    models.Comment.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    models.Comment.belongsToMany(models.Deal, {
      through: models.DealComment
    });
    models.Comment.belongsToMany(models.Contact, {
      through: models.ContactComment
    });
  };

  return Comment;
};
