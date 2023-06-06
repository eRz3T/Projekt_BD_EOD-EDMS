const { v4: uuidv4 } = require('uuid')
const WorkflowModel = require('../models/workflow')

exports.createWorkflow = async (req, res) => {
  try {
    const { name, category } = req.body
    const workflow = await WorkflowModel.createWorkflow(uuidv4(), name, category)
    res.status(201).json(workflow)
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.getWorkflows = async (req, res) => {
  const { workflowName, categoryId } = req.query

  try {
    const workflows = await WorkflowModel.getWorkflows(workflowName, categoryId)
    res.status(200).json(workflows)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.getWorkflowSteps = async (req, res) => {
  try {
    const { id } = req.params
    const steps = await WorkflowModel.getSteps(id)
    res.status(200).json(steps)
  } catch (error) {
    res.status(500).json({ error })
  }
}
