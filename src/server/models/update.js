var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	var Update = sequelize.define('Update', {
		updateType: { type: Sequelize.TEXT, allowNull: false },
		startingVal: { type: Sequelize.TEXT, allowNull: false },
		endingVal: { type: Sequelize.TEXT, allowNull: false },
		creationDate: { type: Sequelize.DATE, allowNull: false }
	});

	Update.associate = function(models) {
		models.Update.belongsTo(models.User, {
			onDelete: 'CASCADE',
			foreignKey: {
				allowNull: true
			}
		});
		models.Update.belongsTo(models.Deal, {
			onDelete: 'CASCADE',
			foreignKey: {
				allowNull: true
			}
		});
	};

	return Update;
};
