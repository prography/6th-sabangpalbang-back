'use strict'
const models = require("../../models")

module.exports = async (req, res) => {
  const a = await models.cocktail.create({
    name: 'Practice of Sequelize.js',
    nameAbc: 'asdf'
  })
  return res.status(200).json(a)
}
