const express = require('express')
const router = express.Router()
const registerValidationRules = require('../validations/authValidations')
const authController = require('../controllers/authController')

router.post('/register', registerValidationRules, authController.register)
router.post('/login', authController.login)

module.exports = router
