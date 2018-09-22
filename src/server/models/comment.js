var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	var Comment = sequelize.define('Comment', {
		body: { type: Sequelize.TEXT, allowNull: false }
	});

	Comment.associate = function(models) {
		models.Comment.belongsTo(models.User, {
			onDelete: 'CASCADE',
			foreignKey: {
				allowNull: false
			}
		});
		models.Comment.belongsTo(models.Contact, {
			onDelete: 'CASCADE',
			foreignKey: {
				allowNull: true
			}
		});

		models.Comment.belongsTo(models.Deal, {
			onDelete: 'CASCADE',
			foreignKey: {
				allowNull: true
			}
		});
	};

	return Comment;
};
