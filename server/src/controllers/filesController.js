const FileModel = require('../models/file')
const path = require('path')
const { v4: uuidv4 } = require('uuid')

exports.uploadFile = async (req, res) => {
  try {
    const newFile = await FileModel.createFile(
      uuidv4(),
      req.body.caseId,
      req.body.userId,
      req.file.filename
    )
    res.status(201).json({ message: 'File uploaded successfuly', newFile })
  } catch (err) {
    res.status(400).json({ error: err.message })
    console.log(err)
  }
}

exports.downloadFile = async (req, res) => {
  try {
    const uploadDir = path.join(__dirname, '..', 'uploads')
    const fileId = req.params.fileId
    const file = await FileModel.getFileById(fileId)

    if (!file) {
      return res.status(404).json({ message: 'File not found' })
    }

    const filePath = path.join(uploadDir, file.filename)

    res.download(filePath, file.filename, (error) => {
      if (error) {
        res.status(500).json({ message: 'Error downloading file' })
      }
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.getFilesByCaseId = async (req, res) => {
  try {
    const caseId = req.params.caseId
    const files = await FileModel.getFilesByCaseId(caseId)

    if (!files) {
      return res.status(404).json({ message: 'No files found for this case' })
    }

    res.status(200).json(files)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
