const models = require('../models');

module.exports = {
	createDealUpdate: function(req, res) {
		models.Update
			.create({
				startingVal: req.body.startingVal,
				endingVal: req.body.endingVal,
				updateType: req.body.updateType,
				DealId: req.body.dealId,
				UserId: req.body.userId,
				creationDate: req.body.creationDate
			})
			.then(function(results) {
				res.json(results);
			});
	},
	getAll: function(req, res) {
		models.Update
			.findAll({
				where: { UserId: req.params.id },
				include: [ models.Deal ]
			})
			.then(function(results) {
				res.json(results);
			});
	},
	closeTime: function(req, res) {
		models.Update
			.findAll({
				where: {
					DealId: req.params.id,
					endingVal: 'Closed Won'
				}
			})
			.then(function(results) {
				res.json(results);
			});
	}
};
