const express = require("express");
const router = express.Router();

const stockageController = require("../controllers/stockage.controller");

router.get("/getAllStockage", stockageController.getAllStockage);
router.get("/buscarStockage", stockageController.buscarStockage); 
router.get("/getStockageById/:id", stockageController.getStockageById);
router.get("/getStockageById/:id", stockageController.getStockageById);
router.patch("/updateStockage/:id", stockageController.updateStockage);
router.delete("/deleteIngredientById/:id", stockageController.deleteIngredientById);
router.get("/porcentajes", stockageController.obtenerStockagePorcentajes);

module.exports = router;

