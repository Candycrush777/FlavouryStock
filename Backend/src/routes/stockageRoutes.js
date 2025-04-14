const express = require("express");
const router = express.Router();

const stockageController = require("../controllers/stockage.controller");

router.get("/getAllStockage", stockageController.getAllStockage);
router.get("/buscar", stockageController.buscarStockage);
router.get("/getStockageById/:id", stockageController.getStockageById);

router.patch("/updateStocage", stockageController.updateStockage);
router.delete("/delete/:id", stockageController.deleteIngredientById);

module.exports = router;

