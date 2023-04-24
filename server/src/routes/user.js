const express = require('express')
const { getUsers, getDoclists } = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

// authMiddleware sprawdza wcześniej czy użytkownik który chce pobrać wszystkich userów, jest zalogowany
router.get('/', authMiddleware.authenticateToken, getUsers)
router.get('/doclists', authMiddleware.authenticateToken, getDoclists)

module.exports = router
