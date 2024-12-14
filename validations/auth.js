import { body } from "express-validator";

export const registerValidation = [
    body('fullName').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').trim().isEmail().withMessage('Enter a valid email address'),
    body('password').trim().isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('avatarUrl').trim().optional().isURL().withMessage('Enter a valid URL'),
]
