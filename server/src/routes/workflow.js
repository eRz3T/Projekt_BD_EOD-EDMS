const express = require('express')
const router = express.Router()

const {
  createWorkflow,
  getWorkflowSteps,
  getWorkflows,
  removeWorkflowAndSteps,
} = require('../controllers/workflowController')

router.get('/', getWorkflows)
router.post('/', createWorkflow)
router.get('/:id/steps', getWorkflowSteps)

module.exports = router
