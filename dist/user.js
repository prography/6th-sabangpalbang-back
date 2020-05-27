'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    userId: DataTypes.STRING,
    name: DataTypes.STRING,
    engName: DataTypes.STRING
  }, {});

  User.associate = function (models) {};

  return User;
};
//# sourceMappingURL=user.js.map