const express = require("express")

const router = express.Router()

const ingredientController = require("../controllers/ingredient.controller")


router.post("/registerBasket", ingredientController.registerBasket)

router.get("/getAllIngredients", ingredientController.getAllIngredients)
router.get("/getIngredientById/:id", ingredientController.getIngredientById)
router.get("/getIngredientsByCategory/:category", ingredientController.getIngredientsByCategory)
router.get("/getIngredientByNombre/:nombre", ingredientController.getIngredientByNombre)
router.get("/obtenerOcupacion", ingredientController.obtenerOcupacion)


router.patch("/updateIngredient/:id_ingrediente", ingredientController.updateIngredient)

module.exports = router
