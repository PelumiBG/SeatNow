import { body } from 'express-validator';

export const registerValidator = ([
    body('name').isEmpty().withMessage('Field must not be empty'),
    body('email').isEmpty().withMessage('Email Required'),
    body('gender').isEmpty().withMessage('Field is required'),
    body('age').isEmpty().withMessage('Field required')
])