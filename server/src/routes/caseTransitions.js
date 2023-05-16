const express = require('express')
const router = express.Router()
const caseTransitionsController = require('../controllers/caseTransitionsController')

router.post('/', caseTransitionsController.createTransition)
// pozostałe routes dla przejść...

module.exports = router
