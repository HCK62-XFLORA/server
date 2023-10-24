'use strict';
const {
  Model
} = require('sequelize');
const { hashPass } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Thread, {foreignKey: "UserId"})
      User.hasMany(models.Comment, {foreignKey: "UserId"})
      User.hasMany(models.MyPlant, {foreignKey: "UserId"})
      User.hasMany(models.Reaction, {foreignKey: "UserId"})
      User.hasMany(models.MyReward, {foreignKey: "UserId"})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      unique: {msg: "Account already exists"},
      allowNull: false,
      validate: {
        notNull: {msg: "Email cannot be empty"},
        notEmpty: {msg: "Email cannot be empty"},
        isEmail: {msg: "Invalid email format"}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "password cannot be empty"},
        notEmpty: {msg: "password cannot be empty"},
        len: {
          args: 8,
          msg: "Password must be at least 8 characters"
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Username cannot be empty"},
        notEmpty: {msg: "Username cannot be empty"}
      }
    },
    birthday: {
      type: DataTypes.DATE,
    },
    gender: {
      type: DataTypes.ENUM(["Male", "Female"]),
      allowNull: false,
      validate: {
        notNull: {msg: "Gender cannot be empty"},
        notEmpty: {msg: "Gender cannot be empty"}
      }
    },
    badge: {
      type: DataTypes.ENUM(["Beginner", "Intermediate", "Expert"]),
    },
    point: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.badge = "Beginner"
        user.password = hashPass(user.password)
        user.point = 0
      },
      beforeUpdate: (user) => {
        user.password =hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};