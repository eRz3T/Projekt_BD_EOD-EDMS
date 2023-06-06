const CommentModel = require('../models/comment')
const FileModel = require('../models/file')
const { v4: uuidv4 } = require('uuid')

exports.createComment = async (req, res) => {
  try {
    const file = req.file
    const newComment = await CommentModel.createComment(
      uuidv4(),
      req.body.caseId,
      req.body.userId,
      req.body.content
    )

    if (file) {
      const uploadedFile = await FileModel.uploadFile(
        uuidv4(),
        req.body.caseId,
        req.body.userId,
        file.filename
      )
      await CommentModel.linkCommentToFile(newComment.id, uploadedFile.id)
    }

    res.status(201).json({ message: `Comment added successfuly`, newComment })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

exports.getCaseComments = async (req, res) => {
  try {
    const caseComments = await CommentModel.getCaseComments(req.params.caseId)

    res.status(200).json(caseComments)
  } catch (err) {
    res.status(400).json({ error: err.message })
    console.log(err)
  }
}
