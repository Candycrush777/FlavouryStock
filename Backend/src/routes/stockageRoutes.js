const express = require("express");
const router = express.Router();

const stockageController = require("../controllers/stockage.controller");

router.get("/getAllStockage", stockageController.getAllStockage);//bien
router.get("/buscar", stockageController.buscarStockage); //todavia mirando cómo
router.get("/getStockageById/:id", stockageController.getStockageById);//bien
router.patch("/updateStockage/:id", stockageController.updateStockage);
router.delete("/delete/:id", stockageController.deleteIngredientById);

module.exports = router;

