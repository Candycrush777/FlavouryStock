const express = require('express')
const routes = express.Router()

const recipeController = require('../controllers/recipe.controller')

routes.get('/getRecipes', recipeController.getAllRecipes)

module.exports = routes