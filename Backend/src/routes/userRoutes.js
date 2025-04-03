const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.delete('/delete/:id', userController.deleteUser)
router.get('/getUsers', userController.getUser)//obtiene todos los usuarios

//update de usuario
router.get('/edit/:id', userController.getUserId)//se obtiene los datos de usuario
router.patch('/update/:id', userController.updateUser)//actualiza datos de usuario

module.exports = router