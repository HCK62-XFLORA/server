'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Forum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Thread, {foreignKey: "ForumId"})
    }
  }
  Forum.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Forum name cannot be empty"},
        notEmpty: {msg: "Forum name cannot be empty"}
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
    modelName: 'Forum',
  });
  return Forum;
};