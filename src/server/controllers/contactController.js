const models = require('../models');

var passport = require('passport');
require('../config/passport/passport')(passport);

var getToken = function(headers) {
	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			return parted[1];
		} else {
			return null;
		}
	} else {
		return null;
	}
};

module.exports = {
	// SHOW CONTACTS
	getOne: function(req, res) {
		models.Contact
			.findOne({
				where: {
					id: req.params.id
				},
				include: [ models.Company, models.Deal ]
			})
			.then(function(results) {
				res.json(results);
			});
	},
	getAll: function(req, res) {
		console.log('userId from req', req.query.userId);
		models.Contact
			.findAll({
				where: {
					UserId: req.query.userId
				},
				include: [ models.Company, models.Deal ]
			})
			.then(function(results) {
				res.json(results);
			});
	},
	edit: function(req, res) {
		console.log(req.body);
		models.Contact
			.update(
				{
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					email: req.body.email,
					address1: req.body.address1,
					address2: req.body.address2,
					city: req.body.city,
					state: req.body.state,
					zip: req.body.zip,
					country: req.body.country,
					phone: req.body.phone,
					mobile: req.body.mobile
				},
				{
					where: { id: req.params.id }
				}
			)
			.then(function(results) {
				res.json(results);
			});
	}
};
