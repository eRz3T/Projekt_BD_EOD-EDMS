const express = require('express')
const router = express.Router()

const workflowCategoryController = require('../controllers/workflowCategoryController')
// const {authenticateAdmin} = require('../middleware/authAdminMiddleware')

router.post('/', workflowCategoryController.createCategory)
router.get('/', workflowCategoryController.getAllCategories)
router.patch('/:id', workflowCategoryController.updateCategory)

module.exports = router
