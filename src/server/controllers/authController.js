const models = require('../models'); // eslint-disable-line no-unused-vars
var passport = require('passport');
var sequelize = require('sequelize');
var settings = require('../config/passport/settings');
require('../config/passport/passport')(passport);
var jwt = require('jsonwebtoken');
var bCrypt = require('bcrypt-nodejs');

module.exports = {
	signin: function(req, res) {
		var isValidPassword = function(userpass, password) {
			return bCrypt.compareSync(password, userpass);
		};
		console.log('Fired');
		models.User
			.findOne({
				where: {
					username: req.body.username
				}
			})
			.then(function(user) {
				if (!user) {
					console.log('fired');
					res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
				} else {
					if (!isValidPassword(user.password, req.body.password)) {
						res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
					} else {
						var token = jwt.sign(user.toJSON(), settings.secret);
						// return the information including token as JSON
						console.log('Yay');
						res.json({ success: true, token: 'JWT ' + token });
					}
				}
			});
	},
	signup: function(req, res) {
		if (!req.body.username || !req.body.password) {
			res.json({ success: false, msg: 'Please pass username and password.' });
		} else {
			models.sequelize.transaction(function(t) {
				return models.User
					.findOrCreate({
						where: {
							username: req.body.username
						},
						defaults: {
							username: req.body.username,
							password: bCrypt.hashSync(req.body.password, bCrypt.genSaltSync(8), null)
						},
						transaction: t
					})
					.spread(function(newUser, created) {
						if (created) {
							var token = jwt.sign(newUser.toJSON(), settings.secret);
							return res.json({ success: true, token: 'JWT ' + token });
						} else {
							res.status(401).send({ success: false, msg: 'User already exists.' });
						}
					});
			});
		}
	},

	logout: function(req, res) {
		req.session.destroy(function() {
			res.redirect('/');
		});
	}
};
