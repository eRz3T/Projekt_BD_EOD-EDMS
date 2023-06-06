const { v4: uuidv4 } = require('uuid')
const WorkflowCategoryModel = require('../models/workflowCategory')

exports.createCategory = async (req, res) => {
  try {
    const { name, color, icon } = req.body
    const category = await WorkflowCategoryModel.createCategory(uuidv4(), name, color, icon)
    res.status(201).json(category)
  } catch (err) {
    console.log(err)
    res.status(500).json({ err })
  }
}

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await WorkflowCategoryModel.getAllCategories()
    res.status(200).json(categories)
  } catch (err) {
    console.log(err)
    res.status(500).json({ err })
  }
}

exports.updateCategory = async (req, res) => {
  try {
    const updatedCategory = await WorkflowCategoryModel.updateCategory(req.params.id, req.body)
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json({ message: `Category successfully updated` })
  } catch (err) {
    console.log('body: ', req.body)
    console.log('id: ', req.params.id)
    console.log(err)
    res.status(500).json({ err })
  }
}
