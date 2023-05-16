const User = require('../models/user')

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.updateUser(req.params.userId, req.body)
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
    const deletedUser = await User.deleteUser(req.params.userId)
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

    const documents = await User.getUsersDoclists(userId)

    res.status(200).json({ documents: documents })
  } catch (error) {
    res.status(500).json({ error })
  }
}
