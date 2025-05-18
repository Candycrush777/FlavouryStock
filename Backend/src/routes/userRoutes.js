const express = require('express')
const router = express.Router()
const { verificarToken } = require("../middlewares/authMiddleware"); // 

const userController = require('../controllers/user.controller')

router.post('/register', verificarToken, userController.register)
router.post('/login', userController.login)
router.delete('/delete/:id', verificarToken, userController.deleteUser)
router.get('/getUsers', verificarToken, userController.getUsers)

//update de usuario
router.get('/edit/:id', verificarToken, userController.getUserId)
router.patch('/update/:id', verificarToken, userController.updateUser)

module.exports = router