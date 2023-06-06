const { v4: uuidv4 } = require('uuid')
const WorkflowStepModel = require('../models/workflowStep')

exports.createStep = async (req, res) => {
  try {
    const { workflow_id, user_id, step_number, previous_step, action } = req.body
    const sanitized_previous_step = previous_step.length > 3 ? previous_step : null
    const step = await WorkflowStepModel.createWorkflowStep(
      uuidv4(),
      workflow_id,
      user_id,
      step_number,
      sanitized_previous_step,
      action
    )
    res.status(201).json({ step })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

exports.completeStep = async (req, res) => {
  try {
    const { id } = req.params
    await WorkflowStepModel.completeStep(id, req.body.workflowStepId)
    res.status(200).json({ message: 'Step completed' })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

exports.revertStep = async (req, res) => {
  try {
    const { id } = req.params
    await WorkflowStepModel.revertStep(id, req.body.workflowStepId)
    res.status(200).json({ message: 'Step reverted' })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

exports.deleteStep = async (req, res) => {
  const { id } = req.params

  try {
    await WorkflowStepModel.deleteStep(id)
    res.status(200).json({ message: 'Step deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}

exports.updateStep = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const updatedStep = await WorkflowStepModel.updateStep(id, data)
    res.status(200).json(updatedStep)
  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }
}
