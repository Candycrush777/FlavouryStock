const express = require("express")

const router = express.Router()

const ingredientController = require("../controllers/ingredient.controller")

//UPDATE DE LA COMPRA
router.post("/registerBasket", ingredientController.registerBasket)

router.get("/getAllIngredients", ingredientController.getAllIngredients)
router.get("/getIngredientById/:id", ingredientController.getIngredientById)
router.get("/getIngredientsByCategory/:category", ingredientController.getIngredientsByCategory)
router.get("/getIngredientByNombre/:nombre", ingredientController.getIngredientByNombre)

router.patch("/updateIngredient/:id_ingrediente", ingredientController.updateIngredient)

module.exports = router
