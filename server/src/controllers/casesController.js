const CaseModel = require('../models/case')
const { v4: uuidv4 } = require('uuid')

exports.createCase = async (req, res) => {
  try {
    const newCase = await CaseModel.createCase(
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

exports.createCaseAndWorkflowSteps = async (req, res) => {
  try {
    await CaseModel.createCaseAndWorkflowSteps(
      uuidv4(),
      req.body.assignedUserId,
      req.body.createdBy,
      req.body.title,
      req.body.description,
      req.body.expiresAt,
      req.body.workflowId
    )
    res.status(201).json({ message: 'Case and workflow steps created successfully.' })
  } catch (err) {
    res.status(400).json({ error: err.message })
    console.log(err)
  }
}

exports.assignWorkflowStepsToCase = async (req, res) => {
  try {
    await CaseModel.assignWorkflowStepsToCase(req.body.caseId, req.body.workflowId)
    res.status(200).json({ message: 'Workflow steps assigned to case successfully.' })
  } catch (err) {
    res.status(400).json({ error: err.message })
    console.log(err)
  }
}

exports.getAllCases = async (req, res) => {
  try {
    const cases = await CaseModel.getAllCases()

    res.status(200).json(cases)
  } catch (err) {
    res.status(400).json({ error: err.message })
    console.log(err)
  }
}

exports.getAllArchivedCases = async (req, res) => {
  try {
    const cases = await CaseModel.getAllArchivedCases()

    res.status(200).json(cases)
  } catch (err) {
    res.status(400).json({ error: err.message })
    console.log(err)
  }
}
