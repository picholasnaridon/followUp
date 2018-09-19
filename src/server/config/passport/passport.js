//load bcrypt
var bCrypt = require("bcrypt-nodejs");
var models = require("../../models");

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var settings = require('./settings'); // get settings file


module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = settings.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    models.User.findOne({where: {id: jwt_payload.id}}).then(function( user) {
          if (user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
