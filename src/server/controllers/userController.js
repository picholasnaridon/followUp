const models = require("../models");

var passport = require('passport');
require('../config/passport/passport')(passport);

var getToken = function(headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(" ");
        if (parted.length === 2) {
        return parted[1];
        } else {
        return null;
        }
      } else {
      return null;
      }
  }

module.exports = {
  currentUser:  function(req, res) {
    var token = getToken(req.headers);
    if (token) {
     res.send(req.user)
    } else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  },
  user: function (req, res) {
    models.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (results) {
      res.json(results);
    });
  },
  users: function (req, res) {
    models.User.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (results) {
      res.json(results);
    });
  },
  //GET USER DEALS
  userDeals: function (req, res) {
    models.User.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Deal]
    }).then(function (results) {
      res.json(results);
    });
  },
  // GET USER CONTACTS
  userContacts: function (req, res) {
    models.User.findOne({
      where: {
        id: req.params.id
      },
      include: [models.Contact]
    }).then(function (results) {
      res.json(results);
    });
  },
  // GET USER COMPANIES
  userCompanies: function (req, res) {
    models.Contact.findOne({
      where: {
        UserId: req.params.id
      },
      include: [models.Company]
    }).then(function (results) {
      res.json(results);
    });
  }
};
