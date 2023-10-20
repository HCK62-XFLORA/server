'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reaction.belongsTo(models.Thread, {foreignKey: "ThreadId"})
      Reaction.belongsTo(models.User, {foreignKey: "UserId"})
    }
  }
  Reaction.init({
    ThreadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true    
    }
  },
    reaction: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Reaction',
  });
  return Reaction;
};