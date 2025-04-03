const express = require("express")

const router = express.Router()

const ingredientController = require("../controllers/ingredient.controller")

/*
para hacer los metodos HTTP, necesito acceder al controlador, 
por eso se crea la variable anterior
*/

//todo AQUí tengo que meter los registros de compra, edits de stocks, delete stocks

//todo      ademas de los trigger ya hechos, necesito trigger que en caso de modificar
//todo      una cantidad, modifique tambien la etiqueta correspondiente

/* en los parentesis va el nombre de la funcion creada en el controller */

//UPDATE DE LA COMPRA
router.post("/registerBasket", ingredientController.registerBasket)

router.get("/getAllIngredients", ingredientController.getAllIngredients)
router.get("/getIngredientById/:id", ingredientController.getIngredientById)
router.get("/getIngredientsByCategory/:category", ingredientController.getIngredientsByCategory)
router.get("/getIngredientByNombre/:nombre", ingredientController.getIngredientByNombre)

router.patch("/updateIngredient/:id_ingrediente", ingredientController.updateIngredient)

module.exports = router
