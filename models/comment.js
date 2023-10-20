'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {foreignKey: "UserId"})
      Comment.belongsTo(models.Thread, {foreignKey: "ThreadId"})
    }
  }
  Comment.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    ThreadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Comment cannot be empty"},
        notEmpty: {msg: "Comment cannot be empty"}
      }
    },
    isUseFul: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};