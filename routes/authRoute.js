const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/checktoken', authController.checkToken)

module.exports = router