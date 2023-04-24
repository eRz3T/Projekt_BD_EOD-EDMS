const User = require('../models/user')

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers()
    res.status(200).json(users)
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
