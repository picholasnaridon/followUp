var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var DealContact = sequelize.define("DealContact", {
    // No attributes required, just the userId and todoId
    // You could add something else here like a favorites boolean field so a user
    //   can mark a todo as "favorited".
  });
  return DealContact;
};
