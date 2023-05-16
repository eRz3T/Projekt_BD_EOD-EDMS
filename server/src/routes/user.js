const express = require('express')
const { getUsers, getDoclists, deleteUser, updateUser } = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const authAdminMiddleware = require('../middleware/authAdminMiddleware')

const router = express.Router()

// authMiddleware sprawdza wcześniej czy użytkownik który chce pobrać wszystkich userów, jest zalogowany
router.get('/', authMiddleware.authenticateToken, authAdminMiddleware.authenticateAdmin, getUsers)
router.delete(
  '/:userId',
  authMiddleware.authenticateToken,
  authAdminMiddleware.authenticateAdmin,
  deleteUser
)
router.put(
  '/:userId',
  authMiddleware.authenticateToken,
  authAdminMiddleware.authenticateAdmin,
  updateUser
)
router.get('/doclists', authMiddleware.authenticateToken, getDoclists)

module.exports = router
