const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.delete('/delete/:id', userController.deleteUser)
router.get('/getUsers', userController.getUsers)

//update de usuario
router.get('/edit/:id', userController.getUserId)
router.patch('/update/:id', userController.updateUser)

module.exports = router