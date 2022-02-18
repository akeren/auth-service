import { body } from 'express-validator';

export const registerValidation = [
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email must be valid'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must contain at least 4 characters'),
];
