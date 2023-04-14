const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { JWT_SECRET } = process.env

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.createUser(
      req.body.email,
      hashedPassword,
      req.body.first_name,
      req.body.last_name
    )
    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.login = async (req, res) => {
  try {
    const user = await User.findByEmail(req.body.email)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' })
    res.json({ message: 'Logged in successfully', token })
  } catch (error) {
    res.status(500).json({ error })
  }
}
