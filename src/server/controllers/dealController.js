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
	create: function(req, res) {
		models.Deal
			.create({
				name: req.body.name,
				UserId: req.body.UserId,
				amount: req.body.amount,
				stage: req.body.stage,
				status: req.body.status,
				source: req.body.source,
				expectedCloseDate: req.body.expectedCloseDate,
				summary: req.body.summary
			})
			.then(function(deal) {
				res.json(deal);
			});
	},

	dealsByStage: function(req, res) {
		models.Deal
			.findAll({
				where: { UserId: req.params.id },
				group: [ 'stage' ],
				attributes: [ 'stage', [ models.sequelize.fn('COUNT', 'stage'), 'stageCount' ] ]
			})
			.then((deal) => {
				res.json(deal);
			});
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
								.findOrCreate({
									where: {
										email: req.body.email,
										UserId: req.body.userId,
										CompanyId: company.id
									},
									defaults: {
										firstName: req.body.firstName,
										lastName: req.body.lastName,
										email: req.body.email,
										CompanyId: company.id,
										UserId: req.body.userId
									}

									// address1: req.body.address1,
									// address2: req.body.address2,
									// city: req.body.city,
									// state: req.body.state,
									// zip: req.body.zip,
									// country: req.body.country,
									// phone: req.body.phone,
									// mobile: req.body.mobile,
									// UserId: req.body.userId,
								})
								.spread(function(contact, created) {
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
			.then((results) => {
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
		models.Deal
			.update(
				{
					stage: req.body.stage
				},
				{
					where: { id: req.params.id }
				}
			)
			.then(function(results) {
				res.json(results);
			});
	},

	getClosed: function(req, res) {
		models.Deal
			.findAll({
				where: {
					stage: { [Op.or]: [ 'Closed Won', 'Closed Lost' ] }
				}
			})
			.then(function(results) {
				res.json(results);
			});
	},

	getActive: function(req, res) {
		models.Deal
			.findAll({
				where: {
					stage: {
						[Op.or]: [ 'Discovery', 'Initial Meeting', 'Proposal Sent', 'Contract Signed', 'Final Review' ]
					}
				}
			})
			.then(function(results) {
				res.json(results);
			});
	},

	edit: function(req, res) {
		models.Deal
			.update(
				{
					stage: req.body.stage,
					name: req.body.name,
					amount: req.body.amount,
					summary: req.body.summary,
					status: req.body.status
				},
				{
					where: { id: req.params.id }
				}
			)
			.then(function(results) {
				res.json(results);
			});
	},

	daysToClose(){
		
	}
};
