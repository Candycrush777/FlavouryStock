const express = require("express")
const router = express.Router()

const etiquetaController = require("../controllers/etiqueta.controller")


router.get("/getEtiquetas", etiquetaController.getEtiquetas)
router.get("/getCaducaP", etiquetaController.getCaducaPronto)
router.get("/getCaducaMP", etiquetaController.getCaducaMuyPronto)
router.get("/getCaducado", etiquetaController.getCaducado)
router.get("/getPosibleRecipe",etiquetaController.getRecetasPosibles)
router.get("/getPosibleRecipeId/:id",etiquetaController.getRecetasPosiblesIdIng)
router.get("/buscarEtiquetas",etiquetaController.buscarEtiquetas)
router.get("/porcentajes", etiquetaController.obtenerCaducidadesPorcentajes);


module.exports = router