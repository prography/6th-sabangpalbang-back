'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    engName: DataTypes.STRING
  }, {})
  User.associate = models => {
  }
  return User
}
