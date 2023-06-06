const express = require('express')
const {
  getUsers,
  getDoclists,
  deleteUser,
  updateUser,
  getActiveCases,
} = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const { authenticateAdmin } = require('../middleware/authAdminMiddleware')

const router = express.Router()

// authMiddleware sprawdza wcześniej czy użytkownik który chce pobrać wszystkich userów, jest zalogowany
router.get('/', authMiddleware.authenticateToken, authenticateAdmin, getUsers)
router.delete('/:userId', authMiddleware.authenticateToken, authenticateAdmin, deleteUser)
router.put('/:userId', authMiddleware.authenticateToken, authenticateAdmin, updateUser)
router.get('/doclists', authMiddleware.authenticateToken, getDoclists)
router.get('/:id/active-cases', authMiddleware.authenticateToken, getActiveCases)

module.exports = router
