'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasOne(models.token,{
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  user.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    Password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};