const models = require('../models');

module.exports = {
	addNote: function(req, res) {
		models.Comment
			.create({
				body: req.body.body,
				DealId: req.body.id
			})
			.then(function(results) {
				res.json(results);
			});
	},
	getNotes: function(req, res) {
		models.Comment
			.findAll({
				where: { DealId: req.body.id }
			})
			.then(function(results) {
				res.json(results);
			});
	}
};
