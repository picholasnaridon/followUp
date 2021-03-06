const models = require('../models');

module.exports = {
	addDealComment: function(req, res) {
		models.Comment
			.create({
				DealId: req.body.id,
				body: req.body.body,
				UserId: req.body.userId
			})
			.then(function(results) {
				res.json(results);
			});
	},
	addContactComment: function(req, res) {
		models.Comment
			.create({
				ContactId: req.body.id,
				body: req.body.body,
				UserId: req.body.userId
			})
			.then(function(results) {
				res.json(results);
			});
	},

	getAll: function(req, res) {
		models.Comment
			.findAll({
				limit: req.params.limit ? req.params.limit : 10,
				where: { UserId: req.params.id },
				order: [ [ 'id', 'DESC' ] ],
				include: [ models.Contact, models.Deal ]
			})
			.then(function(results) {
				res.json(results);
			});
	},
	getDealComments: function(req, res) {
		models.Comment
			.findAll({
				where: { DealId: req.params.id }
			})
			.then(function(results) {
				res.json(results);
			});
	},
	getContactComments: function(req, res) {
		models.Comment
			.findAll({
				where: { ContactId: req.params.id }
			})
			.then(function(results) {
				res.json(results);
			});
	}
};
