const CaseTransition = require('../models/caseTransition')
const Case = require('../models/case')
const { v4: uuidv4 } = require('uuid')

exports.createTransition = async (req, res) => {
  try {
    const newTransition = await CaseTransition.createTransition(
      uuidv4(),
      req.body.caseId,
      req.body.fromUserId,
      req.body.toUserId
    )
    const updatedCase = await Case.updateAssignedUser(req.body.caseId, req.body.toUserId)
    res.status(201).json({ message: 'Case moved successfuly', newTransition, updatedCase })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
