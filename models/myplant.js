'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MyPlant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyPlant.belongsTo(models.User, {foreignKey: "UserId"})
      // MyPlant.belongsTo(models.Plant, {foreignKey: "PlantId"}) //INI HARUS DIBUAT WOIIII JANGAN LUPAAA
    }
  }
  MyPlant.init({
    PlantId: {
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
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Image cannot be empty"},
        notEmpty: {msg: "Image cannot be empty"}
      }
    }
  }, {
    sequelize,
    modelName: 'MyPlant',
  });
  return MyPlant;
};