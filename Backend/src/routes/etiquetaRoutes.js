const express = require("express")
const router = express.Router()

const etiquetaController = require("../controllers/etiqueta.controller")


/* AQUI NO VAN LOS POST DE ETIQUETA, 

ya que se manejan con triggers al registrar la compra, 
manejado desde ingrediente */



//router.get("/getAllIngredients", ingredientController.getAllIngredients)

router.get("/getEtiquetas", etiquetaController.getEtiquetas)
router.get("/getCaducaP", etiquetaController.getCaducaPronto)
router.get("/getCaducaMP", etiquetaController.getCaducaMuyPronto)
router.get("/getCaducado", etiquetaController.getCaducado)
router.get("/getPosibleRecipe",etiquetaController.getRecetasPosibles)
router.get("/getPosibleRecipeId/:id",etiquetaController.getRecetasPosiblesIdIng)

module.exports = router