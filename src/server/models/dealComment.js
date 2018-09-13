var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var DealComment = sequelize.define("DealComment", {});
  return DealComment;
};
