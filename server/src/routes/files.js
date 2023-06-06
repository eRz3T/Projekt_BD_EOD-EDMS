const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const uploadMiddleware = require('../middleware/uploadMiddleware')
const filesController = require('../controllers/filesController')

router.post('/', uploadMiddleware.single('file'), filesController.uploadFile)
router.get('/:fileId/download', filesController.downloadFile)
router.get('/case/:caseId', filesController.getFilesByCaseId)

module.exports = router
