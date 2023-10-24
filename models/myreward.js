'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyReward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyReward.belongsTo(models.User, {foreignKey: "UserId"})
      MyReward.belongsTo(models.Reward, {foreignKey: "RewardId"})
    }
  }
  MyReward.init({
    UserId: DataTypes.INTEGER,
    RewardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MyReward',
  });
  return MyReward;
};