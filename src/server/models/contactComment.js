var Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  var ContactComment = sequelize.define("ContactComment", {});
  return ContactComment;
};
