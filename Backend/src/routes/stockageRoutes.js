const express = require("express");
const router = express.Router();

const stockageController = require("../controllers/stockage.controller");

router.get("/getAllStockage", stockageController.getAllStockage);//bien
router.get("/buscarStockage", stockageController.buscarStockage); //bien
router.get("/getStockageById/:id", stockageController.getStockageById);//bien
router.patch("/updateStockage/:id", stockageController.updateStockage);//bien
router.delete("/deleteIngredientById/:id", stockageController.deleteIngredientById);

module.exports = router;

