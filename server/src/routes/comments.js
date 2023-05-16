const uploadMiddleware = require('../middleware/uploadMiddleware')
const express = require('express')
const router = express.Router()
const commentsController = require('../controllers/commentsController')

router.post('/', uploadMiddleware.single('file'), commentsController.createComment)
router.get('/case/:caseId', commentsController.getCaseComments)

module.exports = router
