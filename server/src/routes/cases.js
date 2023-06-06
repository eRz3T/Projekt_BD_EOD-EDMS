const express = require('express')
const router = express.Router()
const casesController = require('../controllers/casesController')

router.post('/', casesController.createCase)
router.post('/with-workflow', casesController.createCaseAndWorkflowSteps)
router.get('/', casesController.getAllCases)
router.get('/archived', casesController.getAllArchivedCases)

module.exports = router
