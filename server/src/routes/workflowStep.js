const express = require('express')
const router = express.Router()
// const authMiddleware = require('../middleware/authMiddleware')
const {
  createStep,
  completeStep,
  revertStep,
  updateStep,
  deleteStep,
} = require('../controllers/workflowStepController')

router.post('/', createStep)
router.patch('/:id/complete', completeStep)
router.patch('/:id/revert', revertStep)
router.patch('/:id', updateStep)
router.delete('/:id', deleteStep)

module.exports = router
