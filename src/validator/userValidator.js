import { body } from "express-validator"

export const userVlidate = ([
    body('username').isEmpty().withMessage('Please insert your name'),
    body('email').isEmail().isEmpty().withMessage('Please insert your email'),
    body('password').isEmpty().isLowercase().withMessage('Password cannot be empty'),
    body('phone').isEmpty().isNumeric('yes').withMessage('Please provide a Phone Number')
]);