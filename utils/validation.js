const { body, validationResult } = require('express-validator');

const validateUser = [
  body('username')
    .isLength({ min: 5, max: 30 }).withMessage('Имя пользователя должно быть от 5 до 30 символов')
    .notEmpty().withMessage('Имя пользователя не может быть пустым'),

  body('email')
    .isEmail().withMessage('Введите правильный адрес электронной почты')
    .notEmpty().withMessage('Email не может быть пустым'),

  body('password')
    .isLength({ min: 6 }).withMessage('Пароль должен быть не менее 6 символов')
    .notEmpty().withMessage('Пароль не может быть пустым')
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports = { validateUser, handleValidationErrors };
