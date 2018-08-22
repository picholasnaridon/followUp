var Sequelize = require('sequelize')


module.exports = function (sequelize, DataTypes) {
  var ContactDeal = sequelize.define("ContactDeal", {
    createdAt: {
      type: Sequelize.STRING,
      defaultValue: '0'
    }
  }, {
    timestamps: false

  });


  return ContactDeal;
};



