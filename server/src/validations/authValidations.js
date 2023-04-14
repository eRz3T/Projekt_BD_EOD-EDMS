const { body } = require('express-validator')

// Walidacja danych przy rejestracji użytkownika nowego
const registerValidationRules = [
  body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/(?=.*[a-z])/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/(?=.*[A-Z])/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/(?=.*\d)/)
    .withMessage('Password must contain at least one number')
    .matches(/(?=.*[\W_])/)
    .withMessage('Password must contain at least one special character'),
  body('first_name')
    .notEmpty()
    .withMessage('Firstname is required')
    .isLength({ min: 2 })
    .withMessage('Firstname must be at least 2 characters long')
    .trim()
    .escape(),
  body('last_name')
    .notEmpty()
    .withMessage('Lastname is required')
    .isLength({ min: 2 })
    .withMessage('Lastname must be at least 2 characters long')
    .trim()
    .escape(),
]

module.exports = registerValidationRules
