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
	// SHOW DEALS

	create: function(req, res) {
		models.Deal
			.create({
				name: req.body.name,
				UserId: req.body.UserId,
				amount: req.body.amount,
				stage: req.body.stage,
				status: req.body.status
			})
			.then(function(deal) {
				res.json(deal);
			});
	},
	update: function(req, res) {
		models.Deal.update({});
	},
	addContact: function(req, res) {
		models.Deal
			.findOne({
				where: {
					id: req.params.id
				}
			})
			.then(function(deal) {
				models.sequelize.transaction(function(t) {
					return models.Company
						.findOrCreate({
							where: {
								name: req.body.company,
								UserId: req.body.userId
							},
							defaults: {
								name: req.body.company,
								UserId: req.body.userId
							}
						})
						.spread(function(company, created) {
							console.log(created);
							return models.Contact
								.create({
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
									mobile: req.body.mobile,
									UserId: req.body.userId,
									CompanyId: company.id
								})
								.then(function(contact) {
									company.addDeals([ deal ]);
									return deal.addContacts([ contact ]);
								});
						})
						.then(function(results) {
							res.json(results);
						});
				});
			});
	},
	getOne: function(req, res) {
		models.Deal
			.findOne({
				where: {
					id: req.params.id
				},
				include: [ models.Company, models.Contact, models.Update ]
			})
			.then(function(results) {
				res.json(results);
			});
	},
	getAll: function(req, res) {
		models.Deal
			.findAll({
				where: {
					UserId: req.query.userId
				},
				include: [ models.Contact, models.Company ]
			})
			.then(function(results) {
				res.json(results);
			});
	},
	changeStage: function(req, res) {
		console.log(req.body);
		models.Deal
			.update(
				{ stage: req.body.stage },
				{
					where: { id: req.params.id }
				}
			)
			.then(function(results) {
				res.json(results);
			});
	},
	edit: function(req, res) {
		console.log(req.body);
		models.Deal
			.update(
				{
					stage: req.body.stage,
					name: req.body.name,
					amount: req.body.amount,
					status: req.body.status
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
