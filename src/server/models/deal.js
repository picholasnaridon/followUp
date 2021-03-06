var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	var Deal = sequelize.define('Deal', {
		name: { type: Sequelize.TEXT, allowNull: false },
		amount: { type: Sequelize.INTEGER, allowNull: true },
		stage: { type: Sequelize.STRING, allowNull: true },
		status: { type: Sequelize.STRING, allowNull: true },
		expectedCloseDate: { type: Sequelize.DATE, allowNull: true },
		summary: { type: Sequelize.TEXT, allowNull: true },
		source: { type: Sequelize.TEXT, allowNull: true }
	});

	Deal.associate = function(models) {
		models.Deal.belongsTo(models.User, {
			onDelete: 'CASCADE',
			foreignKey: {
				allowNull: false
			}
		});
		models.Deal.belongsToMany(models.Contact, {
			through: models.DealContact
		});
		models.Deal.hasMany(models.Comment);
		models.Deal.hasMany(models.Update);
		models.Deal.belongsTo(models.Company);
	};

	return Deal;
};
