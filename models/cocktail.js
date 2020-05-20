'use strict'
module.exports = (sequelize, DataTypes) => {
  const Cocktail = sequelize.define('cocktail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    nameAbc: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    }
  }, {})
  Cocktail.associate = function (models) {
  }
  return Cocktail
}

