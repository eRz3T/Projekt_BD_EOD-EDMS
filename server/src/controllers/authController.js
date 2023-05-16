const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { JWT_SECRET } = process.env

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.createUser(
      uuidv4(),
      req.body.email,
      hashedPassword,
      req.body.first_name,
      req.body.last_name
    )
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        username: `${user.first_name} ${user.last_name}`,
        createdAt: user.created_at,
      },
    })
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

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' })
    res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: `${user.first_name} ${user.last_name}`,
        createdAt: user.created_at,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(400).json({ error, message: 'Error' })
  }
}
