import { body } from 'express-validator';

export const createArticleValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
];
