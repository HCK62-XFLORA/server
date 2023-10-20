'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Thread.belongsTo(models.User, {foreignKey: "UserId"})
      Thread.hasMany(models.Comment, {foreignKey: "ThreadId"})
      Thread.hasMany(models.Reaction, {foreignKey: "ThreadId"})
      Thread.belongsTo(models.Forum, {foreignKey: "ForumId"})
    }
  }
  Thread.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Image cannot be empty"},
        notEmpty: {msg: "Image cannot be empty"}
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {msg: "Content cannot be empty"},
        notEmpty: {msg: "Content cannot be empty"}
      }
    },
    ForumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Thread',
  });
  return Thread;
};