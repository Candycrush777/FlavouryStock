const express = require('express')
import Ingrediente from './../models/ingredient.model';
const router = express.Router()

const IngredientController = require('../controllers/ingredients.controller')

/*
para hacer los metodos HTTP, necesito acceder al controlador, 
por eso se crea la variable anterior
*/

//todo AQUí tengo que meter los registros de compra, edits de stocks, delete stocks

//todo ademas de los trigger ya hechos, necesito trigger que en caso de modificar 
//todo una cantidad, modifique tambien la etiqueta correspondiente

/* en los parentesis va el nombre de la funcion creada en el controller */
router.post()