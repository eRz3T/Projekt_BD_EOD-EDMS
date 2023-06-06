const UserModel = require('../models/user')
const bcrypt = require('bcryptjs')

exports.getUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10)
    const updatedUser = await UserModel.updateUser(
      req.params.userId,
      req.body.email,
      password,
      req.body.first_name,
      req.body.last_name
    )
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: `User successfully updated` })
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.deleteUser(req.params.userId)
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ message: `User successfully deleted` })
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.getDoclists = async (req, res) => {
  try {
    const userId = req.body.id

    const documents = await UserModel.getUsersDoclists(userId)

    res.status(200).json({ documents: documents })
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.getActiveCases = async (req, res) => {
  try {
    const userId = req.params.id

    const activeCases = await UserModel.getActiveCases(userId)

    res.status(200).json(activeCases)
  } catch (error) {
    res.status(500).json({ error })
    console.log(error)
  }
}
