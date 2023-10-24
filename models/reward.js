'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reward.hasMany(models.MyReward, {foreignKey: "RewardId"})
    }
  }
  Reward.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    point: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reward',
  });
  return Reward;
};