var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var DealContact = sequelize.define("DealContact", {});
  return DealContact;
};
