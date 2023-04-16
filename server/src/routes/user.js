const express = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// authMiddleware sprawdza wcześniej czy użytkownik który chce pobrać wszystkich userów, jest zalogowany
router.get('/', authMiddleware.authenticateToken, userController.getUsers)

module.exports = router
