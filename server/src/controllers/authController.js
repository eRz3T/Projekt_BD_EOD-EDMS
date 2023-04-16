const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const { JWT_SECRET } = process.env

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.createUser(
      req.body.email,
      hashedPassword,
      req.body.first_name,
      req.body.last_name
    )
    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    res.status(400).json({ error: error.message })
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
    res.status(400).json({ error, message: 'Error' })
  }
}
