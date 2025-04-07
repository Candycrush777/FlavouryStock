const express = require("express");
const router = express.Router();

const recipeController = require("../controllers/recipe.controller");

routes.get("/getRecipes", recipeController.getAllRecipes);

router.post('/registerRecipe', recipeController.registerRecipe);

router.get("/getRecipeById/:id", recipeController.getRecipeById);

router.put("/updateRecipe/:id", recipeController.updateRecipe);

router.delete("/deleteRecipe/:id", recipeController.deleteRecipe);

module.exports = router;
