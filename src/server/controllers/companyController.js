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
	getOne: function(req, res) {
		models.Company
			.findOne({
				where: {
					id: req.params.id
				},
				include: [ models.Deal, models.Contact ]
			})
			.then(function(results) {
				res.json(results);
			});
	},
	getAll: function(req, res) {
		models.Company
			.findAll({
				where: {
					UserId: req.query.userId
				},
				include: [ models.Deal, models.Contact ]
			})
			.then(function(results) {
				res.json(results);
			});
	},
	edit: function(req, res) {
		console.log(req.body);
		models.Company
			.update(
				{
					email: req.body.email,
					address1: req.body.address1,
					address2: req.body.address2,
					city: req.body.city,
					state: req.body.state,
					zip: req.body.zip,
					phone: req.body.phone,
					mobile: req.body.mobile,
					country: req.body.country
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
