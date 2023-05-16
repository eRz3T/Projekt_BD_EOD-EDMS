const express = require('express')
const router = express.Router()
const casesController = require('../controllers/casesController')

router.post('/', casesController.createCase)
router.get('/user/:userId', casesController.getAllAssignedCases)

module.exports = router
