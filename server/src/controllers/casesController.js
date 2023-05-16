const Case = require('../models/case')
const { v4: uuidv4 } = require('uuid')

exports.createCase = async (req, res) => {
  try {
    const newCase = await Case.createCase(
      uuidv4(),
      req.body.assignedUserId,
      req.body.createdBy,
      req.body.title,
      req.body.description,
      req.body.expiresAt
    )
    res.status(201).json({ message: 'Case created successfuly', newCase })
  } catch (err) {
    res.status(400).json({ error: err.message })
    console.log(err)
  }
}

exports.getAllAssignedCases = async (req, res) => {
  try {
    const usersCases = await Case.getAllUserCases(req.params.userId)
    if (!usersCases) {
      res.status(400).json({ message: 'You have no assigned cases' })
    }

    res.status(200).json(usersCases)
  } catch (err) {
    res.status(400).json({ error: err.message })
    console.log(err)
  }
}
