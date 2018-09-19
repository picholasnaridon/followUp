const models = require("../models"); // eslint-disable-line no-unused-vars
var passport = require("passport")

var settings = require('../config/passport/settings');
require('../config/passport/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var bCrypt = require('bcrypt-nodejs')

module.exports = {
  
 
  signin: function(req, res) {
    var isValidPassword = function(userpass, password) {
      return bCrypt.compareSync(password, userpass);
    };
    console.log("Fired")
      models.User.findOne({where:{
      username: req.body.username
    }}).then(function(user) {
      if (!user) {
        console.log("fired")
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        if (!isValidPassword(user.password, req.body.password)) {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        } else {
          var token = jwt.sign(user.toJSON(), settings.secret);
            // return the information including token as JSON
            console.log("Yay")
            res.json({success: true, token: 'JWT ' + token})
        }
      }
    })
  },
  signup: function(req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({success: false, msg: 'Please pass username and password.'});
    } else {
      models.User.create({
          username: req.body.username,
        password: bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(8), null)
        }).then(function (newUser) {
          if (!newUser) {
              return res.json({success: false, msg: 'Username already exists.'});
          }

          if (newUser) {
            res.json({success: true, msg: 'Successful created new user.'});
          }
      });
    }
  },

  logout: function (req, res) {
    req.session.destroy(function () {
      res.redirect("/");
    });
  }
  
}
