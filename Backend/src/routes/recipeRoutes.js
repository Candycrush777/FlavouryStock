const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe.controller");


router.get('/getRecipes', recipeController.getAllRecipes); 
router.post('/registerRecipe', recipeController.registerRecipe); 
router.get('/getRecipeById/:id', recipeController.getRecipeById);
router.patch('/updateRecipe/:id', recipeController.updateRecipe); 
router.delete('/deleteRecipe/:id', recipeController.deleteRecipe);
router.get('/search', recipeController.searchRecipeName)

module.exports = router;
